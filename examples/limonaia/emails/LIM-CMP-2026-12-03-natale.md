# LIM-CMP-2026-12-03 · Natale gift box

The brief panel that sits beside this email in Figma.

| | |
|---|---|
| **Send** | Thursday, December 3, 2026 · 10:00 a.m. ET (recipient's time zone where available) |
| **From** | Limonaia · ciao@limonaia.example |
| **Audience** | Engaged in the last 90 days (opened or clicked) plus all past purchasers. Exclude anyone who bought a gift box since November 1. One audience. |

## Subject lines

- A · natale is here
- B · three jars, a wooden box, your note inside
- C · order by December 17 for Christmas

## Preview text

- A · Clementine and cinnamon, here until Christmas, packed with your note.
- B · Natale and any two blends, $68 with the card.
- C · The gift box ships with your note inside. US orders by Thursday, December 17.

## Tone and strategy

Real season, real deadline. The urgency comes from the shipping cutoff and Natale leaving after
Christmas, without a countdown or a discount. Lead with the gift and the note. The price
appears once, plainly.

## Conditional blocks

None in the frame. Optional: show UK profiles the December 11 cutoff in the top bar with an
`{% if %}` on the profile's country.

## Products

- Gift box: $68 with three 80 g jars, the wooden box and a card. Ships free in the US.
- Natale: clementine and cinnamon, limited, November to December.

## Live stock

Fictional store. In a live build, this is the email most likely to need a stock alert: Natale
and the wooden boxes are both limited. Check both before approval, and raise an alert if either
is under about 50 for a whole-list send.

## Verify before send

- [ ] The cutoff dates match the carrier holiday calendars (US December 17, UK December 11)
- [ ] The gift box page lets buyers pick Natale plus two blends
- [ ] The card message field shows at checkout
- [ ] No inbox collision with other early-December sends
- [ ] Alt text on the hero
- [ ] Both buttons land on the gift box page

## Links

| Element | Destination |
|---|---|
| Send a gift box (intro and deadline box) | `/products/gift-box?blend=natale` |
| Footer | `/collections/all`, `/pages/our-story`, `/account`, Instagram |
