# Active interpretation edition 4.0

The nine formulas, fixture and VIII Strength / XI Justice / XXII Fool assignments below remain unchanged. The source-aware active interpretation pipeline is specified in [PROFESSIONAL_METHODOLOGY.md](PROFESSIONAL_METHODOLOGY.md); review boundaries and proposed future changes in [METHODOLOGY_MIGRATION.md](METHODOLOGY_MIGRATION.md). It is an independent Destiny Code convention, not the complete Ladini system. The fixed public sample now uses that same active engine. Historical content measurements and development-only date-access descriptions below refer to earlier editions; current premium access is governed by the unchanged server entitlement checks documented in PAYMENT_ARCHITECTURE.md.

---

# Historical calculation and editorial record

# Destiny Code: nine-position 22-Arcana variant

This is a deterministic symbolic framework for entertainment and self-reflection, not a scientific personality assessment or prediction. Different Destiny Matrix traditions use different reduction rules and positional meanings. This implementation documents one specific variant; it does not claim universal correctness.

## Input and date handling

Accept exactly YYYY-MM-DD, with a four-digit year 0001–9999, a real Gregorian calendar day, and a date no later than the current UTC calendar day. Leap years are divisible by 4, except century years unless divisible by 400. Parse numeric components, never `new Date(birthDate)`, so a visitor's timezone cannot shift their birth date. The UTC definition of “today” makes the server and browser boundary consistent; near midnight this can differ from a visitor's local calendar. Validation happens both on form submission and on the result route. The all-zero year is rejected.

## Reduction

`reduce22(n)` accepts positive safe integers. While n > 22, replace n with the sum of its decimal digits. Preserve 1 through 22. Thus 22 → 22, 23 → 5, 29 → 11, 31 → 4, and 99 → 18. This is not subtraction modulo 22. There is no zero arcana in this variant.

## Positions

For DD-MM-YYYY:

| Position | Diagram location | Formula |
| --- | --- | --- |
| A | Left | reduce22(day) |
| B | Top | month |
| C | Right | reduce22(sum of the four year digits) |
| D | Bottom | reduce22(A+B+C) |
| E | Center | reduce22(A+B+C+D) |
| NW | Northwest | reduce22(A+B) |
| NE | Northeast | reduce22(B+C) |
| SE | Southeast | reduce22(C+D) |
| SW | Southwest | reduce22(D+A) |

No additional channels, cycles, compatibility scores, or positional life meanings are computed. The diagram buttons expose positional labels and values. Premium editorial sections are reflection themes built around the center, not additional numerological calculations.

## Regression fixture

1993-04-17: A=17, B=4, C=22 (1+9+9+3), D=7 (43 → 7), E=5 (50 → 5), NW=21, NE=8 (26 → 8), SE=11 (29 → 11), SW=6 (24 → 6).

## Interpretation convention

The center selects exactly one of 22 original, fixed interpretations. Number VIII is Strength, XI is Justice, and XXII is The Fool. Names and ordering differ in other traditions. Each entry has a symbolic theme, strengths to consider, a reflection question, and a growth practice. These are exploratory writing, not empirically established attributes. Identical dates always produce identical chart values and base writing; the only time-dependent validation is whether a date is in the future.

## Full reading editorial convention (version 3.1)

The nine formulas and regression fixture above are unchanged. Edition 3.1 refines the editorial content rather than changing the numerology. The chapters now distinguish a compact calculation blueprint from a substantial explanation of all nine positions.

| Chapter | Existing positions | Editorial use |
| --- | --- | --- |
| Your Numerology Blueprint | All nine | Show actual arithmetic proofs, selected archetypes, and the distinction between calculation and interpretation. |
| Core Personality & Inner World | E, B, D | Contrast the center question with practice and synthesis; no factual personality profile is inferred. |
| Strengths & Hidden Talents | A, NW, NE | Examine beginning, returning to practice, and feedback as observable activities, not aptitude scores. |
| Love & Relationships | SW, NE, E | Explore expression, listening, and the center's question without partner data, compatibility or outcome claims. |
| Money & Career Themes | C, SE, D | Reflect on values, work conditions, motivation and action; no financial or career prediction. |
| Challenges & Personal Growth | B, D, E | Consider constructive tensions, reversible exercises and limits rather than diagnosing defects. |
| The Nine Positions Explained | All nine | Explain each documented position, its actual arcana, an ordinary context and a position-specific exercise. |
| Personal Reflection & Integration | E, A, C, B, D | Develop an evidence-aware personal synthesis, questions and an optional next step. |

`longform-interpretations.ts` contains 88 original passages: inner world, dialogue, work and integration for each of the 22 original arcana. `position-essays.ts` contains substantial original explanations and exercises for the nine existing positional lenses. These extend the existing center, premium and depth libraries; none of the original 22 center interpretations is changed.

Comparisons between positions are **authored editorial interpretations**, not additional traditional formulas, hidden channels, psychological forces or compatibility calculations. Source labels, values and arithmetic proofs accompany each chapter. For example, contrasting A with NW examines a beginning and a return to practice; it does not calculate a new talent score.

Identical whole library paragraphs are included only at their first use. A later occurrence can reference a different earlier chapter, but never the current chapter. If removing shared prose leaves an empty block, a context specific to the actual position takes its place. Normalized reflection questions are unique across the report. A library experiment is used at most once; recurring values receive distinct position-specific tasks for beginning, practice, action or a shared situation. Position-specific explanations still differ because their formulas and documented editorial contexts differ. Existing chapter anchors are retained where appropriate; the old `strengths-and-natural-talents` anchor aliases Strengths & Hidden Talents. The former `life-themes` anchor now identifies The Nine Positions Explained.

The report's `core` field explicitly identifies the center archetype independently of chapter order. All cover consumers use this field, so moving the blueprint to chapter one cannot accidentally put the day archetype on a center-labeled cover.

`wordCount` counts the actual chapter body prose, exercises, reflection questions and closing synthesis once. Navigation, headings, duplicated reference labels and PDF furniture are excluded. Reading time is a rounded estimate at 200 words/minute, not a visitor metric. Target length is approximately 6,000–9,000 meaningful words, not a runtime minimum: no padding is appended to reach a number. Actual length varies with matrix values and cross-references.

Position selection is fixed by section. Arcana text is fixed by number. No randomness, visitor profiling, name inference, or external AI generation is used at runtime. A repeated number repeats a symbol; it does not increase its authority or indicate greater intensity. Different dates with the same nine values receive the same symbolic reading apart from their displayed dates. Readers may reject any interpretation that does not fit their experience. The original 22 center interpretations remain unchanged.

## Local preview and PDF

Full readings and their PDFs require NODE_ENV=development **and** DESTINY_CODE_LOCAL_PREVIEW=1 on the server. They are development previews, never evidence of purchase or entitlements. Do not expose the development server publicly. Production routes return 404 even if the preview flag is set. Public pricing remains disabled.

The PDF uses the same report object as the page, built locally on the server with embedded PDF standard-font references (Times and Helvetica), vector geometry, explicit page breaks, text wrapping, and page numbers. It makes no network requests and has no generated-at timestamp, random identifiers, or user-specific hidden metadata. Identical valid input, report version and PDF edition yield identical PDF bytes. Birth dates remain plain calendar strings; none are converted to timestamps. Content edits intentionally change future output.


## Public chart and excerpt boundaries

The chart and free secondary readings use only the original public archetype library and the documented position labels. A selected node shows its formula, computed value, inputs, editorial lens, and a question; SVG lines are decorative connections only. The three free secondary perspectives use A, B, and D. No premium report data is passed into the client chart.

Public result pages render limited excerpts (the first two sentences of one block per preview chapter), plus a cover using the date and public center archetype. Complete sections, exercises and the PDF remain behind the server development gate. Copying the archetype summary is an explicit clipboard action with no birth date, result URL, storage, analytics, or network request.

## Historical edition 3.0 measurement and export

A lightweight direct execution of the pure report modules, under a 256 MB JavaScript heap limit, measured 8,971 body words for 1993-04-17 and 8,506 for 1992-05-18. A repeated-symbol example, 0001-01-01, measured 8,246 words after deduplication. These are examples, not guarantees of fixed length for every date.

The 1993-04-17 PDF has 39 pages and 143,832 bytes. The writer exports every actual report paragraph, practice and question; it does not consume the public excerpt component. Position explanations begin on their own pages after the first position. Heading/body preflight and standard-font text wrapping preserve the existing vector/text approach. Page count is determined by content, not blank-page insertion or an arbitrary page target. Complete text coverage, PDF cross-reference offsets and stream lengths were checked programmatically; visual pagination remains a manual check.

## Studio refinement 3.1

The calculation engine, fixture, original center interpretations, and position definitions remain unchanged. Editorial normalization is implemented in the report assembler with the authored `editorial-context.ts` data, rather than patched into a single example date. The shared blueprint removes repeated methodological boilerplate while retaining its essential symbolic/entertainment framing.

The edited 1993-04-17 sample contains 8,727 body words. Each PDF edition has 33 pages, down from the historical 39-page layout without shortening the actual report for PDF. Paragraphs flow across pages with two-line widow/orphan handling; chapter openers can share a page when sufficient space remains. Reflection questions use inset panels. A table of contents records actual chapter start pages. Standard Times/Helvetica references, original emblem paths, vector chart geometry and fixed palettes keep export local and small. No font files are embedded or separately distributed.

Light and dark editions change presentation only. `edition=light|dark` is validated after the existing development gate, cannot establish authorization, and is independent of browser theme. Screen theme preference is also presentation-only and contains no date or report entitlement.

The 22 SVG emblems are original geometric symbols corresponding to the existing archetype names. They add no chart positions or interpretations. Selecting a corner in the interactive chart highlights its two documented adjacent inputs; these connectors do not calculate a new channel.
