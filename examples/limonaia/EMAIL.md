# EMAIL.md · Limonaia

The design system for Limonaia's emails, written for an AI to read before it designs anything.
Limonaia is a fictional brand. Use this file as a model for your own.

- **Figma file:** private (the screenshots are in [`images/`](images))
- **Pages:** Brand kit, Components, Website, Emails
- **Sender:** Limonaia <ciao@limonaia.example>
- **Corrections:** [`corrections.md`](corrections.md), next to this file

## Brand

- **What it sells:** herbal tea from the Cilento coast in southern Italy, made from lemons, figs,
  wild fennel, sage, bergamot and chamomile. Loose-leaf, in refillable matte ceramic jars, plus
  a discovery set, gift boxes and a subscription.
- **Who it's for:** people who have been to Italy and want the feeling back at home, and people
  buying a gift that feels personal.
- **Where it sells:** online only, to the US and UK.
- **The promise:** a Mediterranean pause, every day, wherever you are.
- **Each blend** is named for a time of day. Each jar carries the month its herbs were harvested.
- **What it never does:** health claims, "detox", or discount-first marketing. It sells a ritual
  and a place.

## Products and prices

| Product | What's in it | Jar color | Size | Price | Notes |
|---|---|---|---|---|---|
| Alba (dawn) | Bergamot, lemon verbena | Lemon yellow | 80 g jar | $24 | |
| Mattina (morning) | Lemon, wild fennel | Cream | 80 g jar | $24 | Best seller. The welcome gift. |
| Mezzogiorno (midday) | Sage, rosemary, mint | Pale olive | 80 g jar | $24 | |
| Pomeriggio (afternoon) | Fig leaf, honeybush, orange peel | Terracotta | 80 g jar | $24 | Gifting favorite |
| Sera (evening) | Chamomile, lemon balm, lavender | Warm sand | 80 g jar | $24 | |
| Estate (summer, iced) | Lemon, mint, hibiscus | Pale sea blue | 80 g jar | $26 | **Seasonal, May to September** |
| Natale (winter) | Clementine, cinnamon | Deep cinnamon red | 80 g jar | $24 | **Seasonal, November to December**, sold mostly in the gift box |
| Refill pouch | Any blend, no jar | Paper pouch | 80 g | $19 | |
| Discovery set | Six 15 g mini jars | All six | 90 g | $32 | The usual first purchase |
| Gift box | Three jars, a wooden box, a card | Buyer's choice | 240 g | $68 | |
| Subscription | Any jar or refill every 4, 6 or 8 weeks | Any | Varies | 15% off | |

- A full jar makes about 35 cups, so a daily drinker runs out in about five weeks. Every refill
  email is timed to that.
- Free US shipping from $50.
- Any email that runs all year needs an off-season state for Estate and Natale.

**How to brew**
- Hot, every blend: a heaped teaspoon (about 2 g) per cup, just-boiled water, five minutes.
- Estate, iced: two spoons in a cup of hot water for five minutes, then an hour in the fridge
  (or overnight). Pour over ice with a slice of lemon and a sprig of mint.

## Color

| Token | Hex | Used for |
|---|---|---|
| color/cream | #F6EFE3 | Email and page background |
| color/ink | #2B2A26 | Body text |
| color/olive | #3E4A2F | Headlines, section eyebrows, footer background |
| color/terracotta | #A84B2A | Buttons, links and prices only |
| color/lemon | #F2C94C | Badges and highlights, never text |
| color/stone | #6F675A | Captions, small print, card eyebrows |
| color/sea | #2F5D6B | Second accent, used sparingly (summer, Estate) |
| color/sand | #EDE3D1 | Section bands and callout boxes |
| color/white | #FFFFFF | Product tiles, chooser rows, option cards |

### Checked text pairings

| Text on background | Ratio | Use |
|---|---|---|
| Ink on cream | 12.6:1 | Body text |
| Olive on cream | 8.3:1 | Headlines, eyebrows |
| Cream on olive | 8.3:1 | Footer |
| Sand on olive | 7.4:1 | Footer small print |
| White on terracotta | 5.7:1 | Primary button |
| Terracotta on white | 5.7:1 | Prices on cards |
| Terracotta on cream | 5.0:1 | Prices, links |
| Ink on lemon | 9.1:1 | Badges |
| Stone on cream | 4.9:1 | Small print |
| Stone on white | 5.6:1 | Card captions |
| Ink on sand | 11.3:1 | Text in bands and callouts |
| Olive on sand | 7.4:1 | Headings in bands and callouts |
| White on sea | 7.2:1 | Summer accents |
| Terracotta on sand | 4.46:1 | **Fails AA. Never use.** |

### Color rules

- Terracotta is for buttons, links and prices only.
- Section eyebrows are olive. Card and tile eyebrows are stone.
- Every price uses `Label/Price` in terracotta.
- Callout boxes (offers, deadlines) are sand with no border, on a cream section.
- Lemon appears once per email at most, as a badge. The lemon in the logo doesn't count.
- Sea appears only in Estate emails, as one band or badge with white text (7.2:1). Never for
  buttons, links or prices.

## Type

- Headlines: DM Serif Display, falling back to Georgia.
- Body, labels and buttons: DM Sans, falling back to Arial.

| Style | Font | Desktop | Mobile | Line height | Letter spacing | Case |
|---|---|---|---|---|---|---|
| Email/H1 | DM Serif Display | 36 | 28 | 116% / 118% | -0.5% | |
| Section heading (Display/H3, mobile Email/Mobile/H2) | DM Serif Display | 28 | 22 | 120% / 124% | 0 | |
| Email/Tile name | DM Serif Display | 20 | 20 | 120% | 0 | |
| Lead (Body/Large, mobile Email/Mobile/Lead) | DM Sans | 20 | 18 | 150% | 0 | |
| Body/Default | DM Sans | 16 | 16 | 155% | 0 | |
| Body/Small | DM Sans Regular | 14 | 14 | 150% | 0 | |
| Label/Eyebrow | DM Sans Medium | 13 | 13 | 140% | 22% | Upper |
| Label/Button | DM Sans SemiBold | 14 | 14 | 100% | 12% | Upper |
| Label/Price | DM Sans Medium | 16 | 16 | 140% | 0 | |
| Quote (Display/Blend, mobile Email/Mobile/Quote) | DM Serif Display Italic | 30 | 22 | 120% / 130% | 0 | |

On mobile only the headlines, the lead and the quote step down. Everything else keeps its
desktop size.

## Components

All email components except the tile, the inbox preview and the button are sets with **Device =
Desktop / Mobile**. The button has no mobile variant: mobile sections stretch it to full width.
Desktop and mobile share their text properties, so a mobile instance takes the same copy as its
desktop twin.

**Section backgrounds.** Steps carries its own sand background. The callout box puts a sand box
inside a transparent section. The top bar and footer are olive. Every other section is
transparent and takes the email's cream, so two of them next to each other share a background.

- **Frame parts:** `Email/Top bar` (text property), `Email/Header`, `Email/Footer`
- **Buttons:** `Button` with Style = Primary (terracotta fill, white label) or Secondary (olive
  outline). Both 46 px tall.
- **Product blocks:**
  - `Email/Blend tile`: 160 px, three across on desktop and two across on mobile
  - `Email/Chooser row`
  - `Email/Cart line`
- **Sections:**
  - `Email/Hero image`
  - `Email/Text block` (Level = Intro or Section, with an optional price line)
  - `Email/Image and text` (Image = Left or Right)
  - `Email/Callout box`
  - `Email/Steps`
  - `Email/Review quote`
- **Around each email:** `Email/Inbox preview`
- **Logo:** `Logo/Horizontal`, `Logo/Horizontal reversed`, `Logo/Seal`

## Layout

**Desktop (600 px)**
- Sections are 48 px top and bottom and 40 px at the sides, with 16 px between items.
- When two sections next to each other share a background, the second drops its top padding.
- Standalone buttons are 240 px wide, 28 px below their copy. Card buttons fill the card.
  Chooser-row buttons hug their label.
- Columns in one row end on the same number of lines.

**Mobile (375 px)**
- 20 px side margins (a 335 px column), 40 px top and bottom.
- Columns stack:
  - Tiles go two across, 15 px apart.
  - Image and text stacks with the image on top.
  - Steps and option cards stack full width.
  - Chooser rows put the button under the text.
- Buttons are full width. Chooser-row buttons still hug their label.
- Images keep their desktop proportion: a 400 px hero becomes 250 px.
- Desktop and mobile share their copy, because one email is sent. A single word alone on the
  last line is fixed with a non-breaking space between the last two words, in both versions.

**Both**
- Auto-layout everywhere, no overlaps, live text only.
- Mockups show rendered content. Merge tags go in layer names and the brief.

## Photography

- **Yes:**
  - still life on linen and pale stone
  - lemons with their leaves, figs, sprigs of herbs
  - terracotta tiles, glass cups that show the tea's color
  - soft morning side light, with the sea blurred far behind
  - hands are fine
- **No:** faces, steam-and-candles spa clichés, cold white studio backgrounds.
- **Every jar in every photo carries its label:** a printed band on the body and, where the lid
  shows, the round sticker with the blend name.
- **One light and one color temperature** across every shot, so the store looks like one shoot.
- **A label's harvest month is a claim.** Every jar label shows the month its herbs were picked.
  A photo can only go into an email whose copy and send date fit that month.

### Photo library

All photos are on the Photography board of the brand kit.

| Photo | What it shows | Printed on it | Notes |
|---|---|---|---|
| Hero | Six labeled jars on a stone wall, lemon grove behind | All six harvest months | Welcome hero |
| Alba, Mattina, Mezzogiorno, Pomeriggio, Sera, Estate | One jar each, with its herbs | That blend's harvest month | Product tiles |
| Discovery set | Six 15 g mini jars in their box, lid stickers on top | Blend names | |
| Refill | Mattina jar with a refill pouch and lemons | Raccolto giugno 2026 | |
| Gift box | Three jars in the wooden box, with the card | Harvest months | |
| Natale | The gift box with the Natale jar and cinnamon | Raccolto novembre 2026 | November to December only |
| Terrace cup | A glass cup of tea on the terrace, sea behind | Nothing | |
| Hands | Hands around a cup | Nothing | The jar in the background is unlabeled: crop it out |
| Estate iced | The Estate jar with an iced glass, lemon and mint | Raccolto luglio 2026 | Hard midday light. Fits summer 2026 copy only |
| Lemon basket | Lemons with rosemary and fennel flower | Nothing | No mint: don't pair it with mint copy |

The harvest months on the labels: Alba January, Mattina June, Mezzogiorno May, Pomeriggio August,
Sera April, Estate July, Natale November, all 2026.

## Voice

**Sounds like** a friend who lives on the coast, writing to you from the terrace: warm, specific
and unhurried.

- Short sentences. Name the real thing: the fennel, the harvest month, the hour of the day.
- One Italian word per email at most, and the sentence makes its meaning clear. The brand
  name, blend names and label text don't count.
- Urgency comes from real seasons and real stock: Estate goes in September, Natale goes after
  Christmas.
- No health claims, no em dashes, no exclamation marks in subject lines.
- Never "Detox your day", "boost your immunity", "LAST CHANCE", "treat yourself", or any line that
  could belong to any tea brand.

Sample lines show the tone. They are examples, not ready-made copy.

| Moment | Sample line |
|---|---|
| Subject line | the lemons are in |
| Preview text | Estate is back for summer: lemon, mint and hibiscus, made for ice. |
| Welcome opening | Ciao. Pull up a chair. Here is what grows outside our door, and how it ends up in your cup. |
| Refill reminder | Your Mattina jar is getting light. A refill pouch is $19 and ships today. |
| Gift deadline | Three jars, a wooden box and your note inside. Order by Thursday for Mother’s Day. |
| Buttons | Choose your blend · Refill Mattina · Send a gift box |

## Customers

| Who | What they want | Usually buys first | What their emails lead with |
|---|---|---|---|
| The returning traveler (35 to 60, has been to southern Italy) | The feeling of that trip, at home | Discovery set | The place: harvest stories, the coast, the blend's time of day |
| The gift giver | A present that feels chosen for them | Gift box | Occasions and timing: "arrives by Friday", the card message, who it suits |
| The daily ritualist | A cup at the same time every day, without running out | Mattina or Sera jar | Routine: refill reminders, the subscription, a new blend for the same moment |

## The emails

| Email | Trigger | Its job |
|---|---|---|
| Welcome 1 | Signs up, no order | Brand story first, then a free mini jar with the first order instead of a percentage off |
| Discovery set to full size | About 18 days after the set arrives | "Which one was yours?" One tap records a favorite and opens that jar |
| Refill reminder | 30 days after a jar, no reorder | Timed to when the jar runs out: a $19 refill or a subscription |
| Natale gift box (campaign) | November to December | A real shipping deadline, the card message, three blends in a wooden box |

## Handoff

Each email in Figma has:
- a status box above it
- an inbox preview (sender, send date or time, subject A, preview A) and a "Desktop · 600"
  label above the email
- its mobile version 60 px to its right
- a brief panel 60 px to the right of the mobile version

The brief covers:
- send or trigger, sender, audience
- every subject and preview variant
- tone, conditional blocks, products, live stock
- the pre-send checklist and links

See [`emails/`](emails) for all four briefs.

## Corrections

The rules learned from blind reviews are in [`corrections.md`](corrections.md). The critic checks
them first on every review.
