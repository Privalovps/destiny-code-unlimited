# Interpretation 4.0 traceability audit

Measured by executing only the deterministic TypeScript report pipeline under a 384 MB Node heap cap. No server, browser, build or PDF rendering was involved. Counts include chapter prose, exercises, questions and unique detailed notes; they exclude headings, navigation and the bibliography appendix. These are measurements for the listed dates, not fixed-length promises.

The convention is `dc-nine-digit-sum-v1`; all samples use interpretation edition 4.0. Active numbering is VIII Strength, XI Justice, XXII Fool.

## 1993-04-17 — 8,744 chapter words

| Position | Proof | Arcanum | Editorial lens |
|---|---|---|---|
| A | reduce22(17) = 17 | 17 / The Star | Starting point |
| B | month = 4 | 4 / The Emperor | Practice |
| C | year digits: 1 + 9 + 9 + 3 = 22; reduce22(22) = 22 | 22 / The Fool | Resources |
| D | reduce22(17 + 4 + 22) = reduce22(43) = 7 | 7 / The Chariot | Integration into action |
| E | reduce22(17 + 4 + 22 + 7) = reduce22(50) = 5 | 5 / The Hierophant | Integrating question |
| NW | reduce22(17 + 4) = 21 | 21 / The World | Practice meeting initiative |
| NE | reduce22(4 + 22) = 8 | 8 / Strength | Listening across differences |
| SE | reduce22(22 + 7) = 11 | 11 / Justice | Resources meeting action |
| SW | reduce22(7 + 17) = 6 | 6 / The Lovers | Agency within connection |

| Chapter anchor | Words |
|---|---:|
| blueprint | 1378 |
| core-personality | 881 |
| hidden-strengths | 827 |
| love-and-relationships | 801 |
| money-mindset | 881 |
| personal-growth | 684 |
| life-themes | 2241 |
| reflection-questions | 957 |

Every block selects its symbol by the value in the named position. Symbol references point to the corresponding inspected Waite chapter; applications and position meanings are labeled Destiny Code editorial synthesis.

## 1992-05-18 — 8,518 chapter words

| Position | Proof | Arcanum | Editorial lens |
|---|---|---|---|
| A | reduce22(18) = 18 | 18 / The Moon | Starting point |
| B | month = 5 | 5 / The Hierophant | Practice |
| C | year digits: 1 + 9 + 9 + 2 = 21; reduce22(21) = 21 | 21 / The World | Resources |
| D | reduce22(18 + 5 + 21) = reduce22(44) = 8 | 8 / Strength | Integration into action |
| E | reduce22(18 + 5 + 21 + 8) = reduce22(52) = 7 | 7 / The Chariot | Integrating question |
| NW | reduce22(18 + 5) = 5 | 5 / The Hierophant | Practice meeting initiative |
| NE | reduce22(5 + 21) = 8 | 8 / Strength | Listening across differences |
| SE | reduce22(21 + 8) = 11 | 11 / Justice | Resources meeting action |
| SW | reduce22(8 + 18) = 8 | 8 / Strength | Agency within connection |

| Chapter anchor | Words |
|---|---:|
| blueprint | 1371 |
| core-personality | 894 |
| hidden-strengths | 722 |
| love-and-relationships | 696 |
| money-mindset | 871 |
| personal-growth | 681 |
| life-themes | 2243 |
| reflection-questions | 949 |

Every block selects its symbol by the value in the named position. Symbol references point to the corresponding inspected Waite chapter; applications and position meanings are labeled Destiny Code editorial synthesis.

## 1987-11-28 — 8,365 chapter words

| Position | Proof | Arcanum | Editorial lens |
|---|---|---|---|
| A | reduce22(28) = 10 | 10 / Wheel of Fortune | Starting point |
| B | month = 11 | 11 / Justice | Practice |
| C | year digits: 1 + 9 + 8 + 7 = 25; reduce22(25) = 7 | 7 / The Chariot | Resources |
| D | reduce22(10 + 11 + 7) = reduce22(28) = 10 | 10 / Wheel of Fortune | Integration into action |
| E | reduce22(10 + 11 + 7 + 10) = reduce22(38) = 11 | 11 / Justice | Integrating question |
| NW | reduce22(10 + 11) = 21 | 21 / The World | Practice meeting initiative |
| NE | reduce22(11 + 7) = 18 | 18 / The Moon | Listening across differences |
| SE | reduce22(7 + 10) = 17 | 17 / The Star | Resources meeting action |
| SW | reduce22(10 + 10) = 20 | 20 / Judgment | Agency within connection |

| Chapter anchor | Words |
|---|---:|
| blueprint | 1370 |
| core-personality | 714 |
| hidden-strengths | 779 |
| love-and-relationships | 807 |
| money-mindset | 893 |
| personal-growth | 622 |
| life-themes | 2250 |
| reflection-questions | 845 |

Every block selects its symbol by the value in the named position. Symbol references point to the corresponding inspected Waite chapter; applications and position meanings are labeled Destiny Code editorial synthesis.

## Interpretive trace examples

- **1993-04-17:** E=5 Hierophant / B=4 Emperor: chapter two distinguishes the legitimacy of an inherited standard from the responsibility and structure through which it is enacted. This is an authored comparison, not a calculated 5–4 program. NE=8 is Strength; SE=11 is Justice. No numbering is swapped to match another school.
- **1992-05-18:** D=8, NE=8 and SW=8 preserve Strength’s symbolism. D asks for deliberate action, NE for receptive listening, SW for a clear boundary within participation. The full generic shadow paragraph and specific everyday example appear once, not three times. The repeat comparison explicitly names the changed tasks and rejects intensified evidential weight.
- **1987-11-28:** B=11 and E=11 retain Justice at both locations, while D=10 uses the Wheel. The repeated symbol receives practice and integrating-question applications; the Wheel adds a changed-conditions perspective. The day’s 28 becomes 10 by digit addition, never 6 by subtraction.

## Before and after — fixed public sample, center 5

Before: the manually written sample said that the Hierophant offered an invitation to examine inherited ideas, followed by a general reflection question. It had five short manually maintained sections.

After: the active center passage examines the standards through which a worthwhile life is recognized and asks which were inherited and which tested. The chapter distinguishes responsible transmission from borrowed authority and dogmatism, gives the E integrating-question task, compares it with the Emperor at B, and links the actual Hierophant source chapter. The public sample now contains all eight generated chapters, not a second hand-written reading.

## Fixed sample and authorized product consistency

`getSampleReport()` accepts no date and calls the same `generateReport` as authorized reports. Both pass the resulting object to `FullReading`. Tests compare the complete sample object, version, matrix and methodology against `generateReport(SAMPLE_DATE)` and protect the fixed-only route boundary. Navigation remains `/report/demo`; no sample PDF endpoint existed or was added.

## Scope of validation

Focused tests cover all 22 entries, numbering, all nine position rules, deterministic output, fixed sample equality, arithmetic fixtures, full paragraph/question/exercise/example deduplication, different domain prose across matrices, source-registry consistency and absence of unsupported inner-node codes. Static reference integrity is checked; this is not an automated promise that external sites will remain available. The existing unauthorized report/PDF tests are also retained.

No PDF page count or visual pagination is claimed. Manually verify both PDF editions, first/last pages, long chapter flow and the new source appendix using an explicitly authorized local test reading.
