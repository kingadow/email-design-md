# EMAIL.md · <Brand name>

<!--
The design system for this brand's emails, written for an AI to read before it designs
anything. Fill in every section. Delete these comments when you're done.
Keep it factual: tokens, sizes, rules, sample lines. If a rule matters, write it here,
because the AI follows what it reads and guesses the rest.
See examples/limonaia/EMAIL.md for a complete one.
Save your copy with the brand's files, with corrections.md next to it.
-->

- **Figma file:** <URL>
- **Pages:** <!-- page names exactly as in Figma: brand kit, components, emails -->
- **Sender:** <Name> <address@brand.com>
- **Corrections:** `corrections.md`, next to this file

## Brand

<!-- Three to six lines. What the brand makes, where, and the one promise it keeps. -->

- What it sells:
- Who it's for:
- Where it sells:
- The promise:
- What it never does: <!-- health claims, discount-first marketing, slang, exclamation marks... -->

## Proof points

<!-- One line that says what the brand promises (the UVP), then the few facts that prove it (the USPs). Every email and page draws on these, so write them once, here. Only facts that are true today. -->

**The promise (UVP):**

| Proof point | Line |
|---|---|
| | |

## Products and prices

<!-- Every product that can appear in an email. Prices exactly as the store shows them. -->

| Product | What's in it | Size | Price | How to use it | Notes (seasonal, best seller, gift) |
|---|---|---|---|---|---|
| | | | | <!-- how to brew, apply or wear it; emails explain this and the AI must not invent it --> | |

- Free shipping threshold:
- Seasonal or limited products, with their dates: <!-- every email that runs all year needs an off-season state for these -->

## Color

<!-- One row per color variable in Figma. Name them by what they are, not by where they're used. -->

| Token | Hex | Used for |
|---|---|---|
| color/<name> | #000000 | Email background |
| color/<name> | #000000 | Body text |
| color/<name> | #000000 | Headlines |
| color/<name> | #000000 | Buttons, links and prices only |
| color/<name> | #000000 | Captions, small print |

### Checked text pairings

<!-- Every text color on every background it sits on. AA needs 4.5:1 for body text, 3:1 for 24 px and up. List the failures too. -->

| Text on background | Ratio | Use |
|---|---|---|
| <ink> on <cream> | 0.0:1 | Body text |
| <accent> on <band color> | 0.0:1 | **Fails. Never use.** |

### Color rules

- The accent is for:
- Eyebrows are:
- Callout boxes are:
- A second accent, if there is one, is allowed only in: <!-- name the emails and the exact elements -->

## Type

- Headlines: <font>, falling back to <Georgia or similar>.
- Body, labels and buttons: <font>, falling back to <Arial or similar>.

| Style | Font | Desktop | Mobile | Line height | Letter spacing | Case |
|---|---|---|---|---|---|---|
| Email/H1 | | 36 | 28 | | | |
| Section heading | | 28 | 22 | | | |
| Lead | | 20 | 18 | | | |
| Body | | 16 | 16 | | | |
| Small | | 14 | 14 | | | |
| Eyebrow | | 13 | 13 | | | Upper |
| Button | | 14 | 14 | | | Upper |
| Price | | 16 | 16 | | | |

## Components

<!-- The component names exactly as they appear in Figma, with what each one is for. -->

- Frame parts: top bar, header, footer
- Buttons: primary, secondary
- Product blocks:
- Sections: hero image, text block, image and text, callout box, steps, review quote
- Mobile: <!-- are mobile versions variants of the same components? Name the property, e.g. Device=Mobile. Name any component without a mobile variant and say why. -->
- Section backgrounds: <!-- which sections carry their own fill (e.g. steps on sand) and which take the email background. The designer needs this to know when two neighbors share a background. -->

## Layout

- Desktop: 600 px wide, sections 48 px top and bottom, 40 px at the sides, 16 px between items.
- Mobile: 375 px wide, sections 40 px top and bottom, 20 px at the sides.
- Buttons: <240> px wide on desktop, full width on mobile, 28 px below their copy.
- Inside components: eyebrow to heading <> px, heading to body <> px, between body paragraphs <> px, on desktop and on mobile. <!-- components should all use these; uneven inner gaps are the most common craft miss -->
- Columns in one row end on the same number of lines.
- When two sections next to each other share a background, the second drops its top padding.
- Auto-layout everywhere, no overlaps, live text only.

## Photography

- Yes:
- No:
- Every product in every photo shows its branding.
- One light and one color temperature across the set.

### Photo library

<!-- Every photo an email can use. The designer picks from this list. Anything printed on the product (a harvest month, a season, a date) is a claim, so write it down. -->

| Photo | What it shows | Where it lives (Figma node or file) | Printed dates or seasons |
|---|---|---|---|
| | | | |

## Voice

<!-- One sentence on who the brand sounds like, then the rules, then real sample lines. -->

- Sounds like:
- Rules:
- Never:

Sample lines show the tone. They are examples, not ready-made copy.

| Moment | Sample line |
|---|---|
| Subject line | |
| Preview text | |
| Welcome opening | |
| Buttons | |

## Customers

| Who | What they want | What their emails lead with |
|---|---|---|
| | | |

## The emails

<!-- What each email in the program is for. The designer reads this to know the job of the email it's designing. -->

| Email | Trigger | Its job |
|---|---|---|
| Welcome 1 | Signs up, no order | |

## Handoff

Each email in Figma has:
- a status box, an inbox preview (sender, subject A, preview A) and a "Desktop · 600" label in
  one column above it
- its mobile version 60 px to its right
- a brief panel 60 px to the right of the mobile version, covering:
  - send or trigger, sender, audience
  - subject and preview variants
  - tone, conditional blocks, products, live stock
  - the pre-send checklist and links

## Corrections

Rules learned from blind reviews live in `corrections.md`, next to this file. A miss that shows
up twice becomes a rule there. The designer and the critic both read it first.

