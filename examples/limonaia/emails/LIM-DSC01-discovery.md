# LIM-DSC01 · Discovery set to full size · Which one was yours?

The brief panel that sits beside this email in Figma.

| | |
|---|---|
| **Send** | Discovery flow, email 1. Trigger plus 21 days (about 18 days after the set arrives), 10:00 a.m. in the recipient's time zone. |
| **From** | Limonaia · ciao@limonaia.example |
| **Audience** | Trigger: Fulfilled Order containing the discovery set. Flow filter: no full-size jar ordered since starting this flow. One audience. |

## Subject lines

- A · which one was yours?
- B · one of the six is emptier than the rest

## Preview text

- A · Tap the blend you kept reaching for and we’ll find its full-size jar.
- B · Pick your favorite and we’ll take you straight to the full jar.

## Tone and strategy

Ask, don't sell. One tap tells us which blend they liked, and that answer decides what every
later email shows them. No discount: the set already did the persuading.

## Conditional blocks

- **Estate row.** From October to April, swap it for the off-season version drawn under the
  frame: "Back in May", with a "Tell me when" button that goes to a back-in-stock signup.
- **Favorite blend.** Each "That’s mine" link carries `?fav=<blend>`. A small flow triggered by
  Clicked Email (URL contains `fav=`) sets the profile property `favorite_blend`. The refill
  and second-purchase emails read it.

## Products

- Alba, Mattina, Mezzogiorno, Pomeriggio, Sera: $24 for an 80 g jar
- Estate: $26 for an 80 g jar (limited, May to September)
- Refill pouch $19 · subscription 15% off

## Live stock

Fictional store. In a live build, check all six full-size jars, since any row can be picked.
Hide the Estate row outside its season.

## Verify before send

- [ ] Each of the six buttons opens the right jar with the right `fav=` value
- [ ] Each button has its own accessible name, for example `aria-label="Alba is mine"`
- [ ] The `favorite_blend` flow is live before this one
- [ ] The Estate off-season version shows from October to April
- [ ] Alt text on the hero and all six rows
- [ ] The $19 refill and the 15% subscription match the store

## Links

| Element | Destination |
|---|---|
| That’s mine | `/products/alba?fav=alba`, same pattern for each blend |
| Tell me when (off-season) | `/products/estate#notify` |
| Shop the blends | `/collections/blends` |
| Footer | `/collections/all`, `/pages/our-story`, `/account`, Instagram |
