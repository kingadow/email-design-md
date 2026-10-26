# Figma Email Readiness Rubric

Six areas, 22 checks. Weights sum to 100. They are ordered by how much each gap costs when an AI,
or a person, designs emails in the file. Ease of detection plays no part in the order.

A check passes or fails, with no partial credit. Checks that look at every email pass when at
least 90% of emails are clean (`CONFIG.coverage`), and the report shows the count, for example
"3/40 emails". Scores are floored.

---

## Components · weight 25

The heaviest area, because components are what make a fix happen once instead of on every email.
An AI building from components produces consistent emails. An AI drawing from scratch produces
drift.

| Check | Pts | Passes when |
|---|---|---|
| C1 Core components | 5 | Header (or logo), footer, button and a product block all exist, local or from a library in use |
| C2 Section components | 5 | At least two of: hero, text block, image-and-text, callout or offer box |
| C3 Text exposed as properties | 5 | At least 70% of components with their own text expose a TEXT property, so copy can be swapped without detaching (logos are excluded) |
| C4 Buttons even and tappable | 5 | Every button variant is at least 44 px tall and all variants of a button are the same height |
| C5 Clean layer names | 5 | At most 5% of layers inside components keep default names like "Frame 12" or "Rectangle 4" (logo and icon artwork is excluded) |

## Email frames · weight 20

These checks decide whether a design translates cleanly into Klaviyo. A frame that looks right
but is built wrong produces a broken build.

| Check | Pts | Passes when |
|---|---|---|
| F1 Email width | 4 | Emails are found at 600 or 640 px wide, or 1200 or 1280 px in files drawn at 2x |
| F2 Auto-layout | 4 | At least 95% of containers inside emails use auto-layout |
| F3 No overlaps | 4 | At least 90% of emails have no overlapping or absolutely positioned layers (icons excluded). Email HTML cannot render overlaps. |
| F4 No fixed text boxes | 4 | At least 90% of emails have no fixed-size text boxes, which clip when a fallback font is wider |
| F5 Built from components | 4 | At least 90% of emails use 3 or more component instances and no empty spacer frames |

## Brand truth and handoff · weight 20

Brand truth is where the AI reads the rules. Handoff is what the next person needs without
asking.

| Check | Pts | Passes when |
|---|---|---|
| B1 Brand kit page | 4 | A page named like a brand kit or guidelines covers at least 4 of: logo, color, type, photography, voice |
| B2 Logo component | 4 | The logo exists as a component (or as a named header or masthead) |
| B3 Inbox preview with each email | 4 | At least 90% of emails have the subject and preview shown above them |
| B4 Brief with each email | 4 | At least 90% of emails have a brief, spec or annotation beside or above them |
| B5 Status with each email | 4 | At least 90% of emails have a status widget or status box above them |

## Color · weight 15

Named color tokens are how an AI picks the right color instead of a close one. Hand-typed hex
codes drift, and nobody can change them everywhere at once.

| Check | Pts | Passes when |
|---|---|---|
| K1 Color tokens exist | 5 | 5 or more color variables or color styles, local or from a library in use |
| K2 Email fills use tokens | 5 | At least 90% of solid fills in emails are bound to a variable or style (logo and icon artwork excluded) |
| K3 Tight palette | 5 | No more than 8 distinct hand-typed hex colors across the emails |

## Type · weight 10

| Check | Pts | Passes when |
|---|---|---|
| T1 Email type scale | 5 | Text styles include a headline size (26 to 48), a body size (14 to 18) and a small size (14 or under) |
| T2 Email text uses styles | 5 | At least 90% of text layers in emails use a text style |

## Accessibility and copy · weight 10

Weighted lower only because these failures are usually fixed in one place, not because they
matter less. A contrast failure is a hard stop in a design review.

| Check | Pts | Passes when |
|---|---|---|
| A1 Text contrast | 5 | At least 90% of emails have no text under WCAG AA (4.5:1, or 3:1 for 24 px or 18.66 px bold and up), measured against the nearest solid background |
| A2 Real copy only | 5 | At least 90% of emails show no raw merge tags or template code (`{{ }}`, `{% %}`) and no placeholder copy. Tags belong in layer names and the brief, so the mockup reads like the sent email. |

---

## Warnings (reported, not scored)

- Hard line breaks in copy
- Straight apostrophes
- No unsubscribe link near the bottom of an email
- No postal address or address tag near the bottom
- Default layer names inside emails
- No widgets anywhere in the file

## Sampling

Files with more than 40 emails are sampled evenly across pages, not from the front. The report
states the sample, for example "40 of 265 emails". Never present a sampled count as a full count.
