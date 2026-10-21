# Limonaia

**A fictional herbal tea brand, built to show EMAIL.md from start to finish.**

Limonaia makes herbal tea from what grows on the Cilento coast in southern Italy. There are six
blends, each named for a time of day: Alba, Mattina, Mezzogiorno, Pomeriggio, Sera and Estate.
They come in refillable ceramic jars, with a discovery set, gift boxes and a subscription.
None of it is real. The region and its crops are, which keeps the story believable.

Everything here was designed with the skills in this repo, then reviewed blind, then fixed.

## What's here

| | |
|---|---|
| [`EMAIL.md`](EMAIL.md) | The brand written down for email: the file the AI reads first |
| [`emails/`](emails) | The brief panel for each of the four emails: send, audience, subject and preview variants, conditional logic, checks, links |
| [`corrections.md`](corrections.md) | The rules learned from blind reviews |
| [`images/emails/`](images/emails) | Every email at full size, [desktop](images/emails/desktop) (600 px) and [mobile](images/emails/mobile) (375 px) |
| [`images/brand-kit/`](images/brand-kit) | The eleven brand kit boards: logo, color, type, jars and labels, photography, voice, email components and rules |
| [`images/website-overview.png`](images/website-overview.png) | The five-page website mockup |
| [`images/first-draft/`](images/first-draft) | The four emails as first designed, before the review |

## The emails

| Email | Job |
|---|---|
| Welcome 1 · "Ciao. Pull up a chair." | Brand story first, then a free mini jar with the first order instead of a percentage off |
| Discovery set to full size · "Which one was yours?" | One tap tells the brand which blend won, and opens that jar |
| Refill reminder · "Your Mattina jar is getting light." | Timed to when a jar runs out: a $19 refill or a subscription |
| Natale gift box (campaign) | A real shipping deadline, a card message, three blends in a wooden box |

![The four emails](images/emails-overview.png)

## How it was built

1. **Brand foundation.**
   - Name, products, prices, customers, palette (every text pair checked for contrast), type,
     photography rules and voice.
   - Three logo directions. The apothecary seal won.
2. **Labels.** A printed band label for every jar and a round sticker for every lid, designed
   in Figma.
3. **Photography.**
   - Fifteen product and scene photos, made with an AI image model.
   - Every scene showing a label then got a second pass, with the real label artwork as the
     reference. See the first lesson below.
4. **Figma setup.**
   - Color variables, an email type scale, a brand kit page.
   - Components for the frame parts, buttons, product blocks and sections, each with Desktop and
     Mobile variants.
5. **Website.** A five-page mockup: home, shop all, a product page, the gift box page and our
   story.
6. **Emails.**
   - Four emails, built from the components, each with an inbox preview, a status box and a
     brief panel.
7. **Blind review.**
   - Four separate critics, each seeing only one email, `EMAIL.md` and the rubric. Scores: 61,
     64, 63, 64.
   - Three hard failures: an eyebrow at 4.46:1 contrast, a price claim that was wrong for one
     blend, and a badge spilling out of its card.
8. **Fixes.** Most were fixed once, in a component, which fixed every email. The misses that
   repeated became rules in [`corrections.md`](corrections.md).
9. **Second blind review.** Four new critics, with a stricter rulebook. Scores: 67, 63, 63, 69.
   Spacing, contrast, buttons and footers all passed. Every email still failed a gate:
   - jar lids with no sticker in the product photos (three emails)
   - a delivery date that didn't say it was for the US only
   - a seasonal blend counted in "any two blends"

   The lids were fixed once, in the photo library, which fixed every email and the website.
10. **Audit.** The file scores 100 on [`figma-email-readiness`](../../skills/figma-email-readiness).

## What we learned

**AI images garble small print.** A model given a labeled jar as reference keeps the big words
and scrambles the small ones ("RACCOLYO" for "RACCOLTO"). The fix is a second pass: generate the
scene, then edit it with the real label artwork as reference. Every label in these photos is
legible down to the harvest month.

**An unlabeled product reads as someone else's.** The first hero showed six plain jars. It
looked fine until it sat next to labeled product tiles. Then it looked like a different brand.
"Every jar in every photo carries its label" became a rule.

**Blind reviews score lower, and they're right.** The emails looked finished. The critics found:
- a contrast failure
- a seasonal product promoted all year in a welcome email
- a "$24" that was wrong for one blend
- buttons sitting too close to their text

None of it would have survived a send.

**A better rulebook finds deeper problems.** The second review came after every first-round fix,
and the scores barely moved: 61 to 67, 64 to 63, 63 to 63, 64 to 69. The critics had more rules to
check, and the spacing and contrast misses were gone, so they found claims and photos instead. A
score only means something next to the rules it was graded against.

**Most fixes belong in a component.** Button heights, the footer's unsubscribe links, the
product tile's price style: each was one change that fixed all four emails. When a miss repeats
across emails, look for the component it comes from.

**Write the rule down.** The model doesn't remember between sessions. A miss written into the
corrections log doesn't come back.

## First draft and final

The [`images/first-draft`](images/first-draft) folder has the four emails as first designed,
before the review and fixes. Put them next to the final versions to see what the review changed.

## License

The Limonaia brand, copy and images are [CC BY 4.0](../../LICENSE-assets.md). Credit
"Limonaia example by Kinga Dow, from the EMAIL.md project". Limonaia is fictional.
