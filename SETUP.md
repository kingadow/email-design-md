# Figma setup for AI email design

What needs to exist in your Figma file before an AI can design on-brand, build-ready emails there. Each item says why it matters. The [`figma-email-readiness`](skills/figma-email-readiness) skill checks all of it and scores the file out of 100.

You don't need all of it on day one. Work top to bottom: the early items do the most.

---

## 1. Brand truth

**A brand kit page.** One page in the file covering the logo, color, type, photography and voice. It's where people check the rules, and `EMAIL.md` is its text twin for the AI.

**An `EMAIL.md`.** Copy [the template](EMAIL.md), fill it in, and keep it with the brand's files. Its header names the Figma file it describes, and `corrections.md` sits next to it. Without it the AI guesses what your brand means. With it, it follows the same rules every time.

**The logo as a component.** Horizontal, reversed for dark backgrounds, and any badge or seal version.

## 2. Color

**Color variables with roles.** Name them by what they are (`color/cream`, `color/olive`) and write down what each one is for. Logo artwork can keep its own fills. An AI picks the right color from a name. From a hex code it picks a close one.

**Checked text pairings.** For every text color you use, write its contrast ratio against each background it sits on. Body text needs 4.5:1. Write the pairings that fail down too, so nobody uses them.

**One accent with one job.** Decide which color is for buttons, links and prices, and keep it off everything else.

## 3. Type

**An email type scale as text styles.** Email sizes are smaller than web sizes. At minimum you need:

| Style | Desktop | Mobile |
|---|---|---|
| Email headline | 32 to 40 | 26 to 30 |
| Section heading | 24 to 28 | 20 to 24 |
| Lead | 18 to 20 | 17 to 18 |
| Body | 16 | 16 |
| Small | 14 | 14 |
| Eyebrow or label | 12 to 13, caps | 12 to 13, caps |
| Button | 14, caps | 14, caps |
| Price | 16 | 16 |

Write the fallback fonts down too (Georgia, Arial), since many email apps block web fonts.

## 4. Components

**Frame parts.** Top bar, header, footer. The footer carries the unsubscribe links and the postal address as a merge tag in the layer name.

**Buttons.** A primary and a secondary style. Both the same height, at least 44 px tall, with the label as a text property.

**Product blocks.** A product tile, and anything else you repeat: a chooser row, a cart line.

**Sections.** Hero image, text block, image and text, callout box, steps, review quote. These are what an email is assembled from. Write down which ones carry their own background, so the designer knows when two neighbors share one.

**Text as properties.** Every piece of copy in a component should be a text property, so it can be swapped without detaching the component.

**Desktop and mobile variants.** 600 px and 375 px, as variants of the same component.

**Clean layer names.** "Heading", "Price" and "Image", never "Frame 47".

## 5. Email frames

- 600 px wide (640 works too), one column that stacks on mobile.
- Files that keep emails at 2x (1200 or 1280 px wide) work too. The audit finds them and reads their type sizes and contrast at half. Any other width: change `emailWidths` at the top of `skills/figma-email-readiness/scripts/audit.js`.
- Auto-layout on every container. No absolute positioning, no overlapping layers: email HTML can't render them.
- Text boxes set to grow with their text, never fixed size.
- Built from component instances, with no empty spacer frames.
- Live text only: nothing that matters baked into an image.
- Real copy only: no lorem ipsum, and no raw merge tags or template code in the mockup.

## 6. Conventions around each email

Each email gets these things around it, so the next person has what they need without asking:

| Where | What | Why |
|---|---|---|
| Above the email, at the top | A status box (draft, in review, approved) | Everyone sees where it stands |
| Above the email, under the status box | An inbox preview: sender, subject, preview text | Subject and preview are designed with the email, never as an afterthought |
| Beside the email, 60 px to the right | The mobile version, top-aligned | Desktop and mobile get reviewed side by side |
| 60 px to the right of the mobile version | A brief panel | Send time, audience, subject and preview variants, conditional logic, products, stock, the pre-send checklist, links |

The subject and preview sit above the email, never inside it, so nobody builds them into the email body by mistake.

- **The status box** can be Figma's Status widget or a component with a State property. A widget can only be cloned from an existing one, and its state is set by hand.
- **The brief panel** works best as one card you clone for every new email, so every brief has the same fields in the same order.

## 7. Photography

- Every product in every photo shows its branding: a label, a sticker, a printed name. Generic packaging reads as someone else's product.
- One light and one color temperature across the set, so the emails look like one shoot.
- No text on photos. Headlines go in live text below.
- A photo library in `EMAIL.md`: every photo, what it shows and where it lives. The AI picks from that list.
- Anything printed on a product in a photo (a harvest month, a season, a date) is a claim. It has to fit the send date of every email the photo goes into.

---

Run the audit when you think you're done:

> Audit my Figma file for email readiness: `<your file URL>`

It scores 22 checks across six areas and writes a report and a fix list, ordered by how much each fix clears.
