# Exact arithmetic specification

Profile: C-family-center-v1. These formulas are selected from source C as one coherent chain; A/B ancestry is a separate research comparison profile.

## Reduction and validation

R22(n): accept a positive integer. While n > 22, replace n by the sum of its decimal digits. Preserve all values 1–22, including 10, 11, 20, 21, and 22. Examples: R22(22)=22; R22(23)=5; R22(29)=11; R22(40)=4; R22(999)=9. This is not modulo 22 or reduction to one digit.

A formula adds its specified already-computed dependencies in one operation, then reduces the total. Never reduce a partial sum inside that formula. R22 is not freely associative: R22(20+20+10)=5, while R22(R22(20+20)+10)=14. Purpose aggregates explicitly require intermediate reductions because their dependencies are named formulas.

Input: Gregorian YYYY-MM-DD, years 0001–9999; date only, no timezone conversion and no birth-time adjustment. Invalid dates are errors, not normalized dates. A product may disallow future birthdays separately using an explicit as-of date; the pure calculator never reads the clock. The pre-01:30 adjustment in A:111 belongs to the separate varna annex and must not change this matrix.

## Formulas and worked trace: 1991-12-09

| ID | Meaning | Inputs | Raw | Reduction chain | Result | Evidence |
|---|---|---|---:|---|---:|---|
| day | Birth-day portrait | dayOfMonth | 9 | 9 | 9 | A:14; C:10 |
| month | Month / spiritual inspiration | monthOfYear | 12 | 12 | 12 | A:14; C:11–12 |
| year | Year / material learning | yearNumber | 20 | 20 | 20 | A:15; C:12–13 |
| bottom | Main learning point | day + month + year | 41 | 41 → 5 | 5 | A:16; C:13–14 |
| core | Personal center | day + month + year + bottom | 46 | 46 → 10 | 10 | A:17; C:14–15 |
| nw | Paternal upper corner | day + month | 21 | 21 | 21 | A:18; C:17–18 |
| ne | Maternal upper corner | month + year | 32 | 32 → 5 | 5 | A:18; C:17–18 |
| se | Paternal lower corner | year + bottom | 25 | 25 → 7 | 7 | A:18; C:17–18 |
| sw | Maternal lower corner | bottom + day | 14 | 14 | 14 | A:18; C:17–18 |
| family_center | Ancestral resource aggregate | nw + ne + se + sw | 47 | 47 → 11 | 11 | C:20–21 |
| day_inner | Family relationship inner point | day + core | 19 | 19 | 19 | A:25; B:20; C:31–32 |
| day_mid | Family relationship middle point | day + day_inner | 28 | 28 → 10 | 10 | A:25; B:20; C:31–32 |
| month_inner | Talent inner point | month + core | 22 | 22 | 22 | A:23; B:13–15; C:28–29 |
| month_mid | Talent middle point | month + month_inner | 34 | 34 → 7 | 7 | A:23; B:13–15; C:28–29 |
| year_inner | Material pattern inner point | year + core | 30 | 30 → 3 | 3 | A:24; B:17–19; C:29–30 |
| year_mid | Material pattern middle point | year + year_inner | 23 | 23 → 5 | 5 | A:24; B:17–19; C:29–30 |
| bottom_inner | Karmic pattern inner point | bottom + core | 15 | 15 | 15 | A:22; B:9–10; C:21–22 |
| bottom_mid | Karmic pattern middle point | bottom + bottom_inner | 20 | 20 | 20 | A:22; B:9–10; C:21–22 |
| nw_inner | Paternal upper inner point | nw + family_center | 32 | 32 → 5 | 5 | C:33 |
| nw_mid | Paternal upper middle point | nw + nw_inner | 26 | 26 → 8 | 8 | C:33 |
| ne_inner | Maternal upper inner point | ne + family_center | 16 | 16 | 16 | C:33–34 |
| ne_mid | Maternal upper middle point | ne + ne_inner | 21 | 21 | 21 | C:34–35 |
| se_inner | Paternal lower inner point | se + family_center | 18 | 18 | 18 | C:33–36 |
| se_mid | Paternal lower middle point | se + se_inner | 25 | 25 → 7 | 7 | C:36 |
| sw_inner | Maternal lower inner point | sw + family_center | 25 | 25 → 7 | 7 | C:33–37 |
| sw_mid | Maternal lower middle point | sw + sw_inner | 21 | 21 | 21 | C:37 |
| heart_earth | Heart desire, Earth axis | core + day_inner | 29 | 29 → 11 | 11 | C:38–39 |
| heart_sky | Heart desire, Sky axis | core + month_inner | 32 | 32 → 5 | 5 | C:38–39 |
| bridge | Relationship–money bridge | year_inner + bottom_inner | 18 | 18 | 18 | A:24; B:17; C:39 |
| money_center | Money-channel midpoint | year_inner + bridge | 21 | 21 | 21 | A:24; B:17–18; C:40 |
| love_center | Relationship-channel midpoint | bottom_inner + bridge | 33 | 33 → 6 | 6 | A:24; B:17–18; C:41 |
| earth | Earth aggregate | day + year | 29 | 29 → 11 | 11 | A:21; C:23–24 |
| sky | Sky aggregate | month + bottom | 17 | 17 | 17 | A:21; C:23–24 |
| purpose_personal | Personal purpose | earth + sky | 28 | 28 → 10 | 10 | A:21; C:24 |
| paternal | Paternal aggregate | nw + se | 28 | 28 → 10 | 10 | A:21; C:25 |
| maternal | Maternal aggregate | ne + sw | 19 | 19 | 19 | A:21; C:25 |
| purpose_social | Social purpose | paternal + maternal | 29 | 29 → 11 | 11 | A:21; C:25–26 |
| purpose_spiritual | Spiritual purpose | purpose_personal + purpose_social | 21 | 21 | 21 | A:21; C:27 |

## Dependency and output contract

38 values are returned: 30 chart nodes, the detached family aggregate, and seven purpose/line aggregates. The family aggregate is a separate value even if its number equals the core. Full operands and every reduction step are recorded in fixtures. No annual cycle, compatibility score, health score, house system, planet assignment, or weighted composite is defined here.

## Competing ancestry convention

For A/B only, replace each corner_inner input family_center with core. Then calculate the middle point from the selected inner point. All other common formulas stay unchanged. For 1991-12-09 C gives NW 21→5→8; the A/B calculation applied to that date gives 21→4→7. The latter is a derived comparison, not an example printed in A/B. C gives family_center=11, core=10.

## Source inconsistencies and exceptions

C:12 uses a day-energy phrase inside its month discussion; C:21 names 15–20–5 while C:226 explicitly specifies calculation order 5–15–20. Numeric node formulas do not change. The explicit C:226 order governs named-tail lookup. A:28 reverses left/right language for parent/material channels relative to its formulas and diagrams; use A:25–26 for location. B:18 symbols and its printed channel values are not safely interchangeable: use the explicit arithmetic roles, not the heart/dollar icon alone.
