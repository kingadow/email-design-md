# Limonaia: corrections log

Rules learned from blind reviews of the Limonaia emails. Each rule below showed up in two or
more emails, or was a call the brand owner made after reviewing them. The critic checks this log
first on every review.

Each rule is written in its most general form, so it covers the whole class of miss. Rules marked
"cold test" came from a fifth email, designed by a fresh agent that had only this repo.

The scores are in the [README](README.md), not here. A critic that reads an earlier score tends to
grade toward it.

## Rules

- **Terracotta is for buttons, links and prices only.**
  - Section eyebrows are `color/olive`. Card and tile eyebrows are `color/stone`. Step numerals
    are olive.
  - **Gate:** terracotta text on `color/sand` is 4.46:1 and fails AA at 13 px.
- **Every price uses `Label/Price` in `color/terracotta`.** That includes one-off price lines in
  body sections, not only the product tile and card components. A price inside a body sentence
  moves to the Text block's price line (second review).
- **One section rhythm.**
  - Desktop sections are 48 px top and bottom and 40 px at the sides, with 16 px between items.
  - When two sections next to each other share a background, the second drops its top padding.
  - No wrapper frames used as spacers.
- **Seasonal products need an off-season state.** Estate (May to September) and Natale
  (November to December) never appear in a year-round flow without a conditional, or an
  alternate drawn beside the frame.
  - That covers every mention: the photo, the price, and counts like "six blends" or "any two
    blends" (second review).
- **Every jar in every photo carries its label.**
  - Jar bodies get a band label. Lids get the round sticker.
  - Photos must look like one shoot, matching the product tiles.
  - **Gate (cold test):** a visible jar body or lid without its label or sticker blocks "ready to
    build". The rule came back once, so it's a gate now.
  - A lid lying or leaning beside its jar counts, and so does anything in the background that
    reads as a jar. Fix it in the library photo, so every email that uses it is fixed at once
    (second review, 2026-10-21).
- **A label in a photo is a claim** (cold test, brand owner's call). The harvest month printed on
  a jar has to fit the copy and the send date. Check the photo library in `EMAIL.md` before
  using a photo.
- **One label per destination.** The same action gets the same button text everywhere in the
  email. Lists of choices use the secondary button. The closing ask may be primary.
- **Buttons breathe and match** (brand owner's call).
  - Standalone buttons are 240 px wide and sit 28 px below their copy.
  - Card buttons fill the card. Chooser-row buttons hug their label.
  - A button 16 px or less under its text is a miss.
- **Columns in one row are even** (brand owner's call). Steps, cards and tiles in one row have
  the same caption line count. Rewrite the copy until they match.
- **The mockup shows rendered content** (brand owner's call). The footer shows a sample address,
  and the merge tag lives in the layer name and the brief.
- **Dates name their market** (second review, gate). Limonaia sells to the US and the UK, so
  every arrival date and order cutoff says which country it's for, or sits in a country
  conditional.
- **Sample lines in `EMAIL.md` are tone examples.** Never reuse one word for word as a headline,
  subject or preview (second review).
- **The brief carries written alt text** for every image. A checklist line saying "alt text
  needed" is a miss (second review).
- **Copy hygiene.**
  - **Gate (second review):** no hard line breaks, including line breaks inside component text
    properties. Split into separate text layers.
  - Curly apostrophes everywhere.
  - No single word alone on the last line.

## Gates fixed once, at component level

Each of these was fixed in the component, which fixed every email at once. A review checks they
haven't come back.

- **Button heights.** The secondary button no longer counts its 1.5 px border in its height.
  Both styles are 46 px.
- **Footer.** "Unsubscribe" and "Update preferences" are underlined. The address is a sample
  with the merge tag in the layer name. No hard line breaks.
- **Product tile type.** The tile name uses the `Email/Tile name` style. The price uses
  `Label/Price` in terracotta.
- **Layer names.** Every text layer in a component is named for its role (Time, Name, Price,
  Label), never left as a copy of the first example's text.
- **Footer copy (cold test).** The desktop and mobile footers carry the same words.
- **Inner spacing (cold test).** Every section component uses one scale: 16 px between lines of
  copy and 28 px to the button on desktop, 12 and 24 on mobile, 8 inside a step. Image and text,
  the callout box and the steps had drifted to 8, 14 and 4.

## Brand notes

- `color/white` (cards) and `color/sand` (section bands, callout boxes) are brand tokens. They
  were added to `EMAIL.md` after the first review flagged them as undocumented.
- Natale's jar color is deep cinnamon red, so it stays distinct from Pomeriggio's terracotta.
