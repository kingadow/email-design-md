# LIM-RFL01 · Refill reminder · Getting light

The brief panel that sits beside this email in Figma.

| | |
|---|---|
| **Send** | Refill flow, email 1. 30 days after a full-size jar order, 10:00 a.m. in the recipient's time zone. |
| **From** | Limonaia · ciao@limonaia.example |
| **Audience** | Trigger: Placed Order containing a full-size jar. Flow filters: no order since starting this flow, and not an active subscriber. One audience. |

## Subject lines

- A · your Mattina jar is getting light
- B · about five cups left, give or take

## Preview text

- A · A refill pouch is $19 and ships today.
- B · Refill for $19, or subscribe and save 15%.

## Tone and strategy

Timed to the jar, not the calendar. Practical and short: what is running out, what it costs, one
click to fix it. The subscription is the easy option, and 15% is the reason, not the headline.

## Conditional blocks

The blend name in subject A, the headline, the refill button and the ingredients line comes from
the order:

```django
{{ event.extra.line_items.0.product.title|default:"tea" }}
```

The hero swaps per blend with `{% if %}` on the same value, in six versions. The frame shows
Mattina. Orders with two jars use the first one.

## Products

- Refill pouch: $19 for 80 g, any blend
- Subscription: 15% off, $16.15 a pouch, every 4, 6 or 8 weeks

## Live stock

Fictional store. In a live build, check the refill pouch for every blend. If one is out, its
version should point to the refills page instead.

## Verify before send

- [ ] The blend name and ingredients fill in for every blend, and read well with the "tea" default
- [ ] The hero matches the blend that was ordered
- [ ] The refill button adds the matching pouch
- [ ] Both "Set up refills" buttons open the same blend with the subscription plan selected
- [ ] $16.15 matches 15% off $19
- [ ] Active subscribers are excluded
- [ ] Alt text on both images

## Links

| Element | Destination |
|---|---|
| Refill Mattina (intro and card) | `/products/mattina-refill` |
| Set up refills (card and closing) | `/products/mattina-refill?plan=subscribe` |
| Footer | `/collections/all`, `/pages/our-story`, `/account`, Instagram |
