# Professional methodology specification — active convention

**Status:** interpretation edition 4.0, calculation convention `dc-nine-digit-sum-v1`. Research checked November 17, 2026. This is **Destiny Code’s nine-position digit-sum convention**, with a documented Waite-style VIII/XI assignment and Fool 22. It is an independent editorial adaptation, **not the complete Natalia Ladini system**. No formula or chart assignment changed in this task.

“Professional” denotes consistent terminology, inspectable derivation and honest source boundaries. It does not mean scientifically verified personality measurement or reliable prediction. The term energy is symbolic vocabulary, not a claim about a measurable force.

## Evidence register and bibliography

Primary tarot material:

- Arthur Edward Waite, *The Pictorial Key to the Tarot*, illustrated from designs by Pamela Colman Smith. London: W. Rider, [1911 in the inspected transcription]. [Title page](https://sacred-texts.com/book/the-pictorial-key-to-the-tarot/start-reading). Part II, §2, the individual Major Trump chapters were inspected. `reading-methodology.ts` records all 22 specific chapter URLs. These support brief descriptions of iconography and the numbering **in that text**, not birth-date position meanings. The source’s religious/divinatory claims are not adopted as factual claims.

Ladini materials and access limits:

- Nataliia/Natalia Ladini, *Матрица судьбы: Первоисточник*. Moscow: Eksmo/Bombora, 2025, 288 pp., ISBN 978-5-04-209095-0. [Publisher](https://bombora.ru/book/175564/); [accessible 15-page excerpt](https://www.respublica.ru/uploads/pdfs/625320.pdf). Bibliographic leaf, contents and opening material inspected. Contents place calculation at printed p. 229, outside the excerpt; code 8 is identified with justice/balance. This is primary evidence of a numbering conflict, not full verification of calculations or energy chapters. No entire book was read.
- [Author-site English *DESTINY MATRIX* PDF listing](https://matricaladini.ru/product/destiny-matrix/), product Book-24-1. Description inspected; paid text not acquired. Edition date and pagination not established from that page.
- Ladini, *Диагностика предназначения и коррекция судьбы*. Russkii impuls, 2012, ISBN 9785902525660. [Google Books catalogue](https://books.google.com/books?id=TQBtkQEACAAJ) reports 125 pages; a secondary methodology page reports 128. Catalogue metadata was inspected, not book text. The pagination discrepancy remains unresolved.

Secondary implementations (not authorities merely by being available):

- [Matrix of Destiny methodology](https://matrixdestiny.io/en/methodology). Describes day/month/year anchors, digit addition above 22, derived bottom/center, adjacent corners and additional inner nodes. Calls D a karmic task and E soul comfort, while also discussing purpose from the center. Its expanded lines require more values than this application calculates. Those roles are not imported.
- [Destiny22 methodology](https://destiny22.com/methodology/). Describes a broader chart including separate ancestral-center calculations, inner money/love points, purposes and tail ordering. Its claimed exhaustive calculator comparison was not independently reproduced. The page corroborates base arithmetic as a secondary account, not every historical attribution.

No copyrighted descriptions, commercial templates, affirmations or paid-book passages were reproduced. No claim is made to have inspected inaccessible chapters. Failed Gutenberg access and a failed publisher preview link did not become evidence; the accessible transcription and retailer excerpt above were used instead.

## Exact live calculations

Use calendar components, not a birth timestamp. Validate a four-digit year from 0001, Gregorian month/day and no later than the current UTC calendar day. `r(n)` repeatedly sums decimal digits **only while n > 22**. Examples: r(22)=22; r(23)=5; r(29)=11; r(31)=4; r(99)=18. r(28)=10, not 6. Each node is reduced before downstream use.

| Code | Location | Formula | Active role — all roles here are Destiny Code editorial synthesis |
|---|---|---|---|
| A | Left | r(day) | Starting point: entry into a task |
| B | Top | month | Practice: repeated approach |
| C | Right | r(sum of year digits) | Resources: available means and their terms |
| D | Bottom | r(A+B+C) | Integration into action |
| E | Center | r(A+B+C+D) | Integrating question; not a verified soul identity |
| NW | Upper left | r(A+B) | Practice meeting initiative |
| NE | Upper right | r(B+C) | Listening across differences |
| SE | Lower right | r(C+D) | Resources meeting action |
| SW | Lower left | r(D+A) | Agency within connection |

The exact coordinates, positional labels and lenses remain in `matrix-positions.ts`. `professional-positions.ts` expands the roles while stating their editorial origin. Location does not establish a traditional life meaning. E recombines inputs already present in D; repeated numbers are not independent observations.

## Numbering and interpretive vocabulary

I Magician; II High Priestess; III Empress; IV Emperor; V Hierophant; VI Lovers; VII Chariot; **VIII Strength**; IX Hermit; X Wheel of Fortune; **XI Justice**; XII Hanged Man; XIII Death; XIV Temperance; XV Devil; XVI Tower; XVII Star; XVIII Moon; XIX Sun; XX Judgment; XXI World; **XXII Fool**.

Waite explicitly discusses exchanging Strength and Justice in his [VIII chapter](https://sacred-texts.com/book/the-pictorial-key-to-the-tarot/viii-strength-or-fortitude). His [Fool chapter](https://sacred-texts.com/book/the-pictorial-key-to-the-tarot/zero-the-fool) uses 0. Destiny Code’s 22 assignment remains a distinct existing numerical convention. Do not call the whole application a historically exact Waite method either: Waite did not supply this birth-date matrix.

**Source-supported layer:** names in the selected sequence, short paraphrases of inspected iconography and explicitly bounded historical explanations.

**Original editorial layer:** constructive/shadow framing; all modern personality, talent, relationship, work and growth applications; all nine position lenses; ordinary examples; questions, exercises, takeaways; comparisons and repeated-value handling. These are not transcriptions of traditional positional doctrines. Shadow is not a reversed-card calculation, diagnosis, curse or karmic sentence. No actual card is drawn.

The structured 22-entry library stores these layers separately, including an exact source link and attribution for each entry. It has distinct themes, concepts, constructive/shadow expressions, tensions, five applications, synthesis, example, exercise and nine position rules per archetype. The original public center library is preserved; the professional premium pipeline no longer consumes the legacy generic premium/depth/longform libraries.

## Comparisons, channels and disputed extensions

`archetype-comparisons.ts` reads two existing positions independently and juxtaposes their themes. Its authored contrasts, including Emperor/Hierophant, Strength/Justice and Star/Moon, are explicitly **editorial comparisons**, not sourced traditional combination programs. It calculates no new value. Repetition retains the archetype and changes the task; identical library paragraphs appear only once, with cross-references to another chapter where useful.

The wider charts in the secondary sources describe additional constructs that are **not implemented here**:

| Construct | Evidence/status | Decision |
|---|---|---|
| Center | Secondary names include comfort and purpose; no verified complete primary position exposition | Keep integrating-question lens |
| Outer diagonals | Secondary sources use ancestral corner terminology | Keep adjacent-sum names; do not infer relatives or ancestral history |
| Love/money | Secondary systems derive inner nodes from center-plus-anchor values, not this chart’s SW/SE outer corners | No channel names or forecasts |
| Life purposes | Secondary derived sums extend beyond the existing center | No mission or purpose hierarchy |
| Karmic tail | Secondary account specifies inner/lower sequences; interpretation and ordering need primary review | Omitted, not inferred from three convenient existing values |
| Age cycles/chakras | Wider systems contain extra positions/overlays | Omitted; no medical or timeline claims |
| Combination programs | No complete primary combination corpus inspected | No traditional program labels asserted |

For comparison only, **not active formulas**: Matrix of Destiny reports inner `d=r(D+E)`, `g=r(C+E)`, `k=r(d+g)`, heart `r(d+k)`, money `r(g+k)`. Destiny22 reports ancestral `U=r(NW+NE+SE+SW)`, inner corner `r(corner+U)`, tail `[r(D+E), r(D+r(D+E)), D]`, sky `r(B+D)` and earth `r(A+C)`. Their inner-node labels are not Destiny Code’s outer-corner names. Primary verification and additional interpretive evidence remain necessary.

A formula reported by one secondary site does not license importing an entire interpretive system. Additional positions require exact source, version, formula, example and tests **before** implementation. No decorative values have been added.

## Worked regression examples

| Date | A | B | C | D | E | NW | NE | SE | SW |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1993-04-17 |17|4|22|7|5|21|8|11|6|
| 1992-05-18 |18|5|21|8|7|5|8|11|8|
| 1987-11-28 |10|11|7|10|11|21|18|17|20|

Example one: year digits sum to 22 and remain 22; D=r(43)=7; E=r(50)=5. Example two: D=r(44)=8 and E=r(52)=7. Example three: day 28 becomes 10; year digits total 25, becoming 7; D=r(28)=10; E=r(38)=11. In all examples 8 means Strength and 11 means Justice. The traceability audit records chapter mappings and interpretation measurements separately.

## Report provenance and presentation

The eight chapter mappings retain existing codes. Blueprint and Detailed Matrix Position Analysis use all nine; inner world E/B/D; strengths A/NW/NE; relationships SW/NE/E; work C/SE/D; growth B/D/E; integration E/A/C/B/D. Section seven is renamed without breaking its `life-themes` anchor.

Each block identifies its actual position, value, symbol and source. Beginner prose explains the theme and application. Native detailed-reading disclosures show the exact proof, editorial role and primary symbol reference without introducing an onboarding mode or changing theme state. The PDF consumes the same report paragraphs and source notes; it does not use abbreviated free excerpts. Notes are deduplicated rather than repeated beneath every occurrence.

`/report/demo` is the sole public full example, fixed server-side to 1993-04-17 through `getSampleReport()`. It uses the same generator, version and server renderer as authorized readings. Query strings do not choose another date. No sample PDF existed in the audited implementation; none was added. Existing arbitrary-ID report/PDF authorization remains mandatory and unchanged.

## Remaining research limitations

The primary Ladini calculation chapter, full positional definitions, detailed purpose layers, tail semantics and combination rules were not available in the inspected excerpt. Primary evidence does establish a numbering discrepancy; deciding whether to adopt another convention remains a separate review. Book metadata and secondary calculator claims cannot settle all those questions. The application is not certified by or affiliated with Ladini’s school, and makes no scientific or predictive validity claim.
