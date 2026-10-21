# LIM-WEL01 · Welcome 1 · Ciao

The brief panel that sits beside this email in Figma.

| | |
|---|---|
| **Send** | Welcome flow, email 1 of 3. Sends right after signup, no delay. |
| **From** | Limonaia · ciao@limonaia.example |
| **Audience** | Trigger: added to the Newsletter list (signup form or pop-up). Flow filter: Placed Order zero times since starting this flow. One audience. |

## Subject lines

- A · ciao, pull up a chair
- B · what grows outside our door

## Preview text

- A · Six blends, one for every hour, and a mini jar on us with your first order.
- B · How a lemon grove on the Cilento coast ends up in your cup.

## Tone and strategy

Brand story first, offer second. The welcome gift is a free mini jar instead of a percentage off,
so the first order doesn't teach people to wait for codes. Lemon is used once, on the offer
badge.

## Conditional blocks

The headline greets by name when there is one:

```django
Ciao{% if person.first_name %}, {{ person.first_name }}{% endif %}. Pull up a chair.
```

The frame shows the version without a name.

## Products

- Alba, Mattina, Mezzogiorno, Pomeriggio, Sera: $24 for an 80 g jar
- Discovery set: $32 for six 15 g mini jars (tile 6)
- Free gift: a 15 g Mattina mini jar on the first order
- Estate is left out. It is seasonal, and this flow runs all year.

## Live stock

Limonaia is fictional, so there is no stock. In a live build, check the Mattina mini jar first:
every first order uses one, so flag it under about 50 units.

## Verify before send

- [ ] The first-name conditional renders with and without a name
- [ ] The mini jar is an automatic free gift in the store, no code
- [ ] Prices match the store
- [ ] Alt text on the hero and all six tiles
- [ ] The footer shows the organization address and working unsubscribe links

## Links

| Element | Destination |
|---|---|
| Logo | `/` |
| Choose your blend | `/collections/blends` |
| Tiles | `/products/alba`, `/mattina`, `/mezzogiorno`, `/pomeriggio`, `/sera`, `/discovery-set` |
| Shop the blends | `/collections/blends` |
| Footer | `/collections/all`, `/pages/our-story`, `/account`, Instagram |
