// figma-email-readiness · audit.js
// READ-ONLY. Paste the whole file into a use_figma call as `code`.
// It reads every page, finds the email frames, scores the file against
// references/rubric.md and returns compact JSON. It never writes to the file.

const CONFIG = {
  emailWidths: [600, 640],   // frame widths that count as an email
  minEmailHeight: 700,       // shorter frames at those widths are components or cards
  coverage: 0.9,             // share of emails that must have inbox preview / brief / status
  maxEmails: 40,             // larger files are sampled evenly, and the result says so
};

const R = { file: figma.root.name, pages: [], emails: [], fileFindings: [], warnings: [], checks: {} };
const DEFAULT_NAME = /^((Frame|Rectangle|Group|Ellipse|Vector|Line|Polygon|Star|Union|Subtract|Intersect|Exclude|Component|Instance|Section)( \d+)?|(Text|Image|image) \d+)$/;
const PLACEHOLDER = /lorem ipsum|^(heading|subheading|title|button|subject line|preview text|body copy|label|text)$/i;
const MERGE_TAG = /\{\{|\{%/;
const near = (a, b, tol = 1) => Math.abs(a - b) <= tol;
const ex = (arr, n = 5) => arr.slice(0, n);

// ---------- color helpers ----------
const lum = ({ r, g, b }) => { const f = c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)]; const [hi, lo] = x > y ? [x, y] : [y, x]; return (hi + 0.05) / (lo + 0.05); };
const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
function topFill(n) {
  if (!('fills' in n) || n.fills === figma.mixed || !Array.isArray(n.fills)) return null;
  const vis = n.fills.filter(f => f.visible !== false && (f.opacity ?? 1) > 0);
  if (!vis.length) return null;
  const f = vis[vis.length - 1];
  if (f.type === 'SOLID') return (f.opacity ?? 1) > 0.95 ? { color: f.color } : { kind: 'translucent' };
  return { kind: f.type === 'IMAGE' ? 'image' : 'gradient' };
}
function background(n) {
  for (let p = n.parent; p && p.type !== 'PAGE'; p = p.parent) { const f = topFill(p); if (f) return f; }
  return null;
}
const ARTWORK_TYPES = ['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'POLYGON', 'ELLIPSE', 'LINE'];
const ARTWORK_NAME = /logo|mark|icon|seal|wordmark|illustration|lockup/i;
function isArtwork(n, root) { if (ARTWORK_TYPES.includes(n.type)) return true; for (let p = n.parent; p && p !== root && p.type !== 'PAGE'; p = p.parent) if (ARTWORK_NAME.test(p.name) || ARTWORK_TYPES.includes(p.type)) return true; return false; }
const isBold = fn => fn && fn !== figma.mixed && /(^|\s)(Bold|ExtraBold|Extra Bold|Black|Heavy)$/i.test(fn.style);

// ---------- 1. walk pages ----------
const localComponents = [];   // {name, node}
const brandPages = [];
let widgetsTotal = 0;
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  const comps = page.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] }).filter(c => !(c.type === 'COMPONENT' && c.parent?.type === 'COMPONENT_SET'));
  comps.forEach(c => localComponents.push(c));
  const tops = [];
  for (const k of page.children) { tops.push(k); if (k.type === 'SECTION') for (const kk of k.children) tops.push(kk); }
  const emails = tops.filter(n => ['FRAME', 'COMPONENT', 'INSTANCE'].includes(n.type) && CONFIG.emailWidths.some(w => near(n.width, w)) && n.height >= CONFIG.minEmailHeight);
  const widgets = page.findAllWithCriteria({ types: ['WIDGET'] });
  widgetsTotal += widgets.length;
  if (/brand|guideline|foundation|style ?guide|identity/i.test(page.name)) brandPages.push(page);
  R.pages.push({ name: page.name, components: comps.length, emails: emails.length });
  for (const e of emails) R.emails.push({ page, node: e, tops });
}

let sampled = false;
if (R.emails.length > CONFIG.maxEmails) { const step = R.emails.length / CONFIG.maxEmails; R.emailTotal = R.emails.length; R.emails = Array.from({ length: CONFIG.maxEmails }, (_, i) => R.emails[Math.floor(i * step)]); sampled = true; }

// ---------- 2. tokens and styles ----------
const colorVars = await figma.variables.getLocalVariablesAsync('COLOR');
const paintStyles = await figma.getLocalPaintStylesAsync();
const textStyles = await figma.getLocalTextStylesAsync();

// ---------- 3. per-email inspection ----------
const usedComponentNames = new Set();
const boundVarIds = new Set();
let fills = 0, tokenFills = 0, texts = 0, styledTexts = 0, containers = 0, autoContainers = 0;
const rawHex = new Map();
const fails = { width: [], overlap: [], fixedText: [], spacer: [], fewInstances: [], contrast: [], mergeTag: [], placeholder: [], defaultNames: [], noUnsub: [], noAddress: [], hardBreaks: [], straightApos: [] };
const handoff = { inbox: 0, brief: 0, status: 0, missing: [] };
const bad = { overlap: new Set(), fixedText: new Set(), built: new Set(), contrast: new Set(), copy: new Set() };

for (const { page, node: e, tops } of R.emails) {
  await figma.setCurrentPageAsync(page);
  const label = `${page.name} / ${e.name}`;
  if (!CONFIG.emailWidths.some(w => near(e.width, w))) fails.width.push(label);

  const all = e.findAll(() => true);
  const insideInstance = n => { for (let p = n.parent; p && p !== e; p = p.parent) if (p.type === 'INSTANCE') return true; return false; };
  const shown = n => { for (let p = n; p && p !== e; p = p.parent) if (p.visible === false) return false; return true; };

  // instances used (top-level within the email) and their main components
  const topInstances = all.filter(n => n.type === 'INSTANCE' && !insideInstance(n));
  for (const inst of topInstances) { try { const mc = await inst.getMainComponentAsync(); if (mc) usedComponentNames.add((mc.parent?.type === 'COMPONENT_SET' ? mc.parent.name : mc.name)); } catch (_) {} }
  if (topInstances.length < 3) { fails.fewInstances.push(`${label} (${topInstances.length} instances)`); bad.built.add(label); }

  for (const n of all) {
    const own = !insideInstance(n);
    // fills and tokens
    const art = isArtwork(n, e);
    if (!art && 'fills' in n && Array.isArray(n.fills)) for (const f of n.fills) {
      if (f.type !== 'SOLID' || f.visible === false) continue;
      fills++;
      const bound = f.boundVariables?.color?.id;
      const styled = n.fillStyleId && n.fillStyleId !== figma.mixed && n.fillStyleId !== '';
      if (bound) { tokenFills++; boundVarIds.add(bound); } else if (styled) tokenFills++; else rawHex.set(hex(f.color), (rawHex.get(hex(f.color)) || 0) + 1);
    }
    // containers and layout
    if (n.type === 'FRAME' && own && !art && !ARTWORK_NAME.test(n.name)) {
      if (n.children.length) { containers++; if (n.layoutMode !== 'NONE') autoContainers++; }
      else if (!topFill(n) && !(n.strokes && n.strokes.length)) { fails.spacer.push(`${label} › ${n.name}`); bad.built.add(label); }
      if (n.layoutMode === 'NONE' && n.children.length > 1 && n.children.length <= 40) {
        const k = n.children;
        for (let i = 0; i < k.length; i++) for (let j = i + 1; j < k.length; j++) {
          const a = k[i], b = k[j];
          if (a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height) { fails.overlap.push(`${label} › ${n.name} (${a.name} / ${b.name})`); bad.overlap.add(label); i = k.length; break; }
        }
      }
    }
    if (own && !art && 'layoutPositioning' in n && n.layoutPositioning === 'ABSOLUTE') { fails.overlap.push(`${label} › ${n.name} (absolute)`); bad.overlap.add(label); }
    if (own && !art && n.type !== 'TEXT' && DEFAULT_NAME.test(n.name)) fails.defaultNames.push(`${label} › ${n.name}`);

    // text
    if (n.type === 'TEXT' && shown(n)) {
      texts++;
      if (n.textStyleId && n.textStyleId !== figma.mixed && n.textStyleId !== '') styledTexts++;
      if (own && n.textAutoResize === 'NONE') { fails.fixedText.push(`${label} › "${n.characters.slice(0, 40)}"`); bad.fixedText.add(label); }
      const chars = n.characters;
      if (MERGE_TAG.test(chars)) { fails.mergeTag.push(`${label} › "${chars.slice(0, 50)}"`); bad.copy.add(label); }
      if (PLACEHOLDER.test(chars.trim())) { fails.placeholder.push(`${label} › "${chars.trim().slice(0, 40)}"`); bad.copy.add(label); }
      if (own && chars.includes('\n')) fails.hardBreaks.push(`${label} › "${chars.slice(0, 40).replace(/\n/g, ' / ')}"`);
      if (/'/.test(chars)) fails.straightApos.push(`${label} › "${chars.slice(0, 40)}"`);
      // contrast
      const tf = topFill(n), bg = background(n);
      if (!art && tf?.color && bg?.color && n.fontSize !== figma.mixed) {
        const ratio = contrast(tf.color, bg.color);
        const large = n.fontSize >= 24 || (n.fontSize >= 18.66 && isBold(n.fontName));
        if (ratio < (large ? 3 : 4.5)) bad.contrast.add(label), fails.contrast.push(`${label} › "${chars.slice(0, 30)}" ${hex(tf.color)} on ${hex(bg.color)} = ${ratio.toFixed(2)}:1 at ${n.fontSize}px`);
      }
    }
  }
  // footer compliance: look at text in the bottom 30% of the email
  const bottomTexts = all.filter(n => n.type === 'TEXT' && (n.absoluteTransform[1][2] - e.absoluteTransform[1][2]) > e.height * 0.7);
  const bottomStr = bottomTexts.map(t => t.characters + ' ' + t.name).join(' | ');
  if (!/unsubscribe/i.test(bottomStr)) fails.noUnsub.push(label);
  if (!/organization|address|\d{3,}|,\s*[A-Z][a-z]+/.test(bottomStr)) fails.noAddress.push(label);

  // handoff: what sits above and beside this email (absolute positions, so sections don't confuse it)
  const box = n => n.absoluteBoundingBox || { x: n.x, y: n.y, width: n.width, height: n.height };
  const E = box(e), ex0 = E.x, ex1 = E.x + E.width, ey = E.y;
  const textOf = n => ('findAll' in n ? n.findAll(k => k.type === 'TEXT').slice(0, 30).map(t => t.characters).join(' ') : '') + ' ' + n.name;
  let hasInbox = false, hasBrief = false, hasStatus = false;
  for (const o of tops) {
    if (o === e || o.type === 'SECTION') continue;
    const O = box(o);
    const overlapX = O.x < ex1 && O.x + O.width > ex0;
    const above = overlapX && O.y + O.height <= ey + 10 && O.y >= ey - 700;
    const beside = O.x >= ex1 - 10 && O.x <= ex1 + 900 && O.y < ey + E.height && O.y + O.height > ey; // 900 leaves room for a mobile frame between the email and its brief
    if (!above && !beside) continue;
    const t = textOf(o);
    if (above && (o.type === 'WIDGET' || /status/i.test(o.name))) hasStatus = true;
    if (above && /inbox|subject/i.test(t) && /preview/i.test(t)) hasInbox = true;
    if ((beside || above) && /brief|annotation|spec|notes|SUBJECT LINE|AUDIENCE|TRIGGER/i.test(t)) hasBrief = true;
  }
  if (hasInbox) handoff.inbox++; if (hasBrief) handoff.brief++; if (hasStatus) handoff.status++;
  if (!hasInbox || !hasBrief || !hasStatus) handoff.missing.push(`${label}: ${[!hasInbox && 'inbox preview', !hasBrief && 'brief', !hasStatus && 'status'].filter(Boolean).join(', ')}`);
}

// library variables actually used in the emails
let remoteVars = 0;
for (const id of boundVarIds) { try { const v = await figma.variables.getVariableByIdAsync(id); if (v?.remote) remoteVars++; } catch (_) {} }

// ---------- 4. components ----------
const compNames = [...new Set([...localComponents.map(c => c.name), ...usedComponentNames])].map(s => s.toLowerCase());
const has = re => compNames.some(n => re.test(n));
const core = { header: has(/header|logo|masthead|nav/), footer: has(/footer/), button: has(/button|cta/), product: has(/product|tile|card|grid|item|chooser|row/) };
const sections = { hero: has(/hero|banner/), text: has(/text|copy|heading|section header|intro|body/), imageText: has(/feature|image.{0,6}text|split|media/), callout: has(/callout|offer|promo|discount|coupon|deadline|\bbox\b/), preheader: has(/preheader|top ?bar|utility|announcement/) };
let withText = 0, withTextProps = 0, compNodes = 0, compDefault = 0; const defaultSamples = [];
for (const c of localComponents) {
  let defs = {}; try { defs = c.componentPropertyDefinitions || {}; } catch (_) {}
  const inInst = n => { for (let p = n.parent; p && p !== c; p = p.parent) if (p.type === 'INSTANCE') return true; return false; };
  const ownText = c.findOne?.(n => n.type === 'TEXT' && !inInst(n) && !isArtwork(n, c));
  if (ownText && !ARTWORK_NAME.test(c.name)) { withText++; if (Object.values(defs).some(d => d.type === 'TEXT')) withTextProps++; }
  for (const n of c.findAll(n => !inInst(n) && !isArtwork(n, c))) { compNodes++; if (DEFAULT_NAME.test(n.name)) { compDefault++; defaultSamples.push(`${c.name} › ${n.name}`); } }
}
const buttons = localComponents.filter(c => /button|cta/i.test(c.name));
let buttonOk = buttons.length > 0, buttonDetail = [];
for (const b of buttons) {
  const variants = b.type === 'COMPONENT_SET' ? b.children : [b];
  const hs = variants.map(v => Math.round(v.height));
  buttonDetail.push(`${b.name}: ${hs.join('/')} px`);
  if (Math.min(...hs) < 44 || Math.max(...hs) - Math.min(...hs) > 1) buttonOk = false;
}
const LOGO = /logo|wordmark|lockup|seal|masthead|brand header/i;
const logoComp = localComponents.some(c => LOGO.test(c.name)) || [...usedComponentNames].some(n => LOGO.test(n));

// ---------- 5. brand kit coverage ----------
let kitText = '';
for (const p of brandPages) { await figma.setCurrentPageAsync(p); kitText += ' ' + p.findAllWithCriteria({ types: ['TEXT'] }).slice(0, 2000).map(t => t.characters).join(' '); }
const topics = { logo: /logo|lockup|wordmark/i, color: /colou?r|palette/i, type: /typograph|type scale|font|typeface/i, photography: /photo|imagery|image/i, voice: /voice|tone/i };
const covered = Object.entries(topics).filter(([, re]) => re.test(kitText)).map(([k]) => k);

// ---------- 6. score ----------
const nE = R.emails.length;
const pct = (a, b) => (b ? a / b : 0);
const C = R.checks;
const chk = (area, id, pts, pass, value, evidence = []) => { C[id] = { area, pts, pass: !!pass, value, evidence: ex(evidence) }; };
const textedPct = pct(withTextProps, withText), defaultPct = pct(compDefault, compNodes);
chk('Components', 'C1 core components', 5, core.header && core.footer && core.button && core.product, core);
chk('Components', 'C2 section components', 5, ['hero', 'text', 'imageText', 'callout'].filter(k => sections[k]).length >= 2, sections);
chk('Components', 'C3 text exposed as properties', 5, withText > 0 && textedPct >= 0.7, `${withTextProps}/${withText} components with text expose a TEXT property`);
chk('Components', 'C4 buttons even and tappable', 5, buttonOk, buttonDetail.join('; ') || 'no button component');
chk('Components', 'C5 clean layer names', 5, compNodes > 0 && defaultPct <= 0.05, `${compDefault}/${compNodes} layers in components have default names`, defaultSamples);
const tokenCount = colorVars.length + paintStyles.length + remoteVars;
const fillPct = pct(tokenFills, fills);
chk('Color', 'K1 color tokens exist', 5, tokenCount >= 5, `${colorVars.length} local variables, ${paintStyles.length} color styles, ${remoteVars} library variables in use`);
chk('Color', 'K2 email fills use tokens', 5, nE > 0 && fillPct >= 0.9, `${tokenFills}/${fills} solid fills bound to a token`);
chk('Color', 'K3 tight palette', 5, nE > 0 && rawHex.size <= 8, `${rawHex.size} distinct raw hex colors in emails`, [...rawHex.entries()].sort((a, b) => b[1] - a[1]).map(([h, n]) => `${h} ×${n}`));
const sizes = textStyles.map(s => s.fontSize);
chk('Type', 'T1 email type scale', 5, sizes.some(s => s >= 26 && s <= 48) && sizes.some(s => s >= 14 && s <= 18) && sizes.some(s => s <= 14), `${textStyles.length} text styles, sizes ${[...new Set(sizes)].sort((a, b) => a - b).join(', ')}`);
chk('Type', 'T2 email text uses styles', 5, nE > 0 && pct(styledTexts, texts) >= 0.9, `${styledTexts}/${texts} text layers use a text style`);
const autoPct = pct(autoContainers, containers);
chk('Email frames', 'F1 email width', 4, nE > 0 && !fails.width.length, `${nE} emails found`, fails.width);
chk('Email frames', 'F2 auto-layout', 4, nE > 0 && autoPct >= 0.95, `${autoContainers}/${containers} containers use auto-layout`);
const clean = set => nE > 0 && 1 - set.size / nE >= CONFIG.coverage;
chk('Email frames', 'F3 no overlaps', 4, clean(bad.overlap), `${bad.overlap.size}/${nE} emails with overlapping or absolute layers`, fails.overlap);
chk('Email frames', 'F4 no fixed text boxes', 4, clean(bad.fixedText), `${bad.fixedText.size}/${nE} emails with fixed-size text boxes (${fails.fixedText.length} layers)`, fails.fixedText);
chk('Email frames', 'F5 built from components', 4, clean(bad.built), `${bad.built.size}/${nE} emails with under 3 instances or empty spacer frames`, [...fails.fewInstances, ...fails.spacer]);
chk('Accessibility and copy', 'A1 text contrast', 5, clean(bad.contrast), `${bad.contrast.size}/${nE} emails with text under AA (${fails.contrast.length} layers)`, fails.contrast);
chk('Accessibility and copy', 'A2 real copy only', 5, clean(bad.copy), `${bad.copy.size}/${nE} emails show raw merge tags or placeholder copy (${fails.mergeTag.length} tags, ${fails.placeholder.length} placeholders)`, [...fails.mergeTag, ...fails.placeholder]);
chk('Brand truth and handoff', 'B1 brand kit page', 4, brandPages.length > 0 && covered.length >= 4, brandPages.length ? `covers ${covered.join(', ')}` : 'no brand kit page');
chk('Brand truth and handoff', 'B2 logo component', 4, logoComp, logoComp ? 'present' : 'missing');
chk('Brand truth and handoff', 'B3 inbox preview with each email', 4, nE > 0 && pct(handoff.inbox, nE) >= CONFIG.coverage, `${handoff.inbox}/${nE}`);
chk('Brand truth and handoff', 'B4 brief with each email', 4, nE > 0 && pct(handoff.brief, nE) >= CONFIG.coverage, `${handoff.brief}/${nE}`);
chk('Brand truth and handoff', 'B5 status with each email', 4, nE > 0 && pct(handoff.status, nE) >= CONFIG.coverage, `${handoff.status}/${nE}`, handoff.missing);

const areas = {};
for (const c of Object.values(C)) { areas[c.area] = areas[c.area] || { earned: 0, of: 0 }; areas[c.area].of += c.pts; if (c.pass) areas[c.area].earned += c.pts; }
const score = Math.floor(Object.values(C).reduce((s, c) => s + (c.pass ? c.pts : 0), 0));
const grade = score >= 90 ? 'Ready' : score >= 75 ? 'Minor gaps' : score >= 55 ? 'Needs work' : 'Not ready';

// file-level findings: missing foundations reported once, at the top
if (!nE) R.fileFindings.push('No email frames found at 600 or 640 px wide. Either there are no emails yet, or they use another width (set CONFIG.emailWidths).');
if (!tokenCount) R.fileFindings.push('No color variables or color styles at all. Every color in the emails is typed by hand.');
if (!textStyles.length) R.fileFindings.push('No text styles at all. Type sizes are set by hand on every layer.');
if (!localComponents.length && !usedComponentNames.size) R.fileFindings.push('No components. Every email is drawn from scratch, so nothing can be fixed once for all emails.');
if (!brandPages.length) R.fileFindings.push('No brand kit page. There is no single place the brand rules live inside the file.');

// warnings: reported, not scored
if (fails.hardBreaks.length) R.warnings.push({ what: 'Hard line breaks in copy', count: fails.hardBreaks.length, evidence: ex(fails.hardBreaks) });
if (fails.straightApos.length) R.warnings.push({ what: 'Straight apostrophes', count: fails.straightApos.length, evidence: ex(fails.straightApos) });
if (fails.noUnsub.length) R.warnings.push({ what: 'No unsubscribe link near the bottom', count: fails.noUnsub.length, evidence: ex(fails.noUnsub) });
if (fails.noAddress.length) R.warnings.push({ what: 'No postal address or address tag near the bottom', count: fails.noAddress.length, evidence: ex(fails.noAddress) });
if (fails.defaultNames.length) R.warnings.push({ what: 'Default layer names inside emails', count: fails.defaultNames.length, evidence: ex(fails.defaultNames) });
if (widgetsTotal === 0) R.warnings.push({ what: 'No widgets in the file (status boxes are often widgets)', count: 0, evidence: [] });

return {
  file: R.file, score, grade, areas, sampled, emailTotal: R.emailTotal || R.emails.length,
  emails: R.emails.map(x => `${x.page.name} / ${x.node.name} (${x.node.id})`).slice(0, 40), emailCount: nE,
  pages: R.pages, fileFindings: R.fileFindings, checks: C, warnings: R.warnings,
  brandKitPages: brandPages.map(p => p.name), components: compNames.length,
};
