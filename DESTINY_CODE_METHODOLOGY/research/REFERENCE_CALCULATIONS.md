# Deterministic reference traces

All dates use C-family-center-v1. A/B differing ancestry values are supplied in test_cases.json. Only the two source-example sets are independently anchored to book arithmetic. Generated fixtures are mathematical regression data, not empirical validation.

## 2000-01-01

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 1 | 1 | 1 |
| month | 1 | 1 | 1 |
| year | 2000 | 2 | 2 |
| bottom | 1 + 1 + 2 | 4 | 4 |
| core | 1 + 1 + 2 + 4 | 8 | 8 |
| nw | 1 + 1 | 2 | 2 |
| ne | 1 + 2 | 3 | 3 |
| se | 2 + 4 | 6 | 6 |
| sw | 4 + 1 | 5 | 5 |
| family_center | 2 + 3 + 6 + 5 | 16 | 16 |
| day_inner | 1 + 8 | 9 | 9 |
| day_mid | 1 + 9 | 10 | 10 |
| month_inner | 1 + 8 | 9 | 9 |
| month_mid | 1 + 9 | 10 | 10 |
| year_inner | 2 + 8 | 10 | 10 |
| year_mid | 2 + 10 | 12 | 12 |
| bottom_inner | 4 + 8 | 12 | 12 |
| bottom_mid | 4 + 12 | 16 | 16 |
| nw_inner | 2 + 16 | 18 | 18 |
| nw_mid | 2 + 18 | 20 | 20 |
| ne_inner | 3 + 16 | 19 | 19 |
| ne_mid | 3 + 19 | 22 | 22 |
| se_inner | 6 + 16 | 22 | 22 |
| se_mid | 6 + 22 | 28 → 10 | 10 |
| sw_inner | 5 + 16 | 21 | 21 |
| sw_mid | 5 + 21 | 26 → 8 | 8 |
| heart_earth | 8 + 9 | 17 | 17 |
| heart_sky | 8 + 9 | 17 | 17 |
| bridge | 10 + 12 | 22 | 22 |
| money_center | 10 + 22 | 32 → 5 | 5 |
| love_center | 12 + 22 | 34 → 7 | 7 |
| earth | 1 + 2 | 3 | 3 |
| sky | 1 + 4 | 5 | 5 |
| purpose_personal | 3 + 5 | 8 | 8 |
| paternal | 2 + 6 | 8 | 8 |
| maternal | 3 + 5 | 8 | 8 |
| purpose_social | 8 + 8 | 16 | 16 |
| purpose_spiritual | 8 + 16 | 24 → 6 | 6 |

## 2000-12-22

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 22 | 22 | 22 |
| month | 12 | 12 | 12 |
| year | 2000 | 2 | 2 |
| bottom | 22 + 12 + 2 | 36 → 9 | 9 |
| core | 22 + 12 + 2 + 9 | 45 → 9 | 9 |
| nw | 22 + 12 | 34 → 7 | 7 |
| ne | 12 + 2 | 14 | 14 |
| se | 2 + 9 | 11 | 11 |
| sw | 9 + 22 | 31 → 4 | 4 |
| family_center | 7 + 14 + 11 + 4 | 36 → 9 | 9 |
| day_inner | 22 + 9 | 31 → 4 | 4 |
| day_mid | 22 + 4 | 26 → 8 | 8 |
| month_inner | 12 + 9 | 21 | 21 |
| month_mid | 12 + 21 | 33 → 6 | 6 |
| year_inner | 2 + 9 | 11 | 11 |
| year_mid | 2 + 11 | 13 | 13 |
| bottom_inner | 9 + 9 | 18 | 18 |
| bottom_mid | 9 + 18 | 27 → 9 | 9 |
| nw_inner | 7 + 9 | 16 | 16 |
| nw_mid | 7 + 16 | 23 → 5 | 5 |
| ne_inner | 14 + 9 | 23 → 5 | 5 |
| ne_mid | 14 + 5 | 19 | 19 |
| se_inner | 11 + 9 | 20 | 20 |
| se_mid | 11 + 20 | 31 → 4 | 4 |
| sw_inner | 4 + 9 | 13 | 13 |
| sw_mid | 4 + 13 | 17 | 17 |
| heart_earth | 9 + 4 | 13 | 13 |
| heart_sky | 9 + 21 | 30 → 3 | 3 |
| bridge | 11 + 18 | 29 → 11 | 11 |
| money_center | 11 + 11 | 22 | 22 |
| love_center | 18 + 11 | 29 → 11 | 11 |
| earth | 22 + 2 | 24 → 6 | 6 |
| sky | 12 + 9 | 21 | 21 |
| purpose_personal | 6 + 21 | 27 → 9 | 9 |
| paternal | 7 + 11 | 18 | 18 |
| maternal | 14 + 4 | 18 | 18 |
| purpose_social | 18 + 18 | 36 → 9 | 9 |
| purpose_spiritual | 9 + 9 | 18 | 18 |

## 1987-01-23

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 23 | 23 → 5 | 5 |
| month | 1 | 1 | 1 |
| year | 1987 | 25 → 7 | 7 |
| bottom | 5 + 1 + 7 | 13 | 13 |
| core | 5 + 1 + 7 + 13 | 26 → 8 | 8 |
| nw | 5 + 1 | 6 | 6 |
| ne | 1 + 7 | 8 | 8 |
| se | 7 + 13 | 20 | 20 |
| sw | 13 + 5 | 18 | 18 |
| family_center | 6 + 8 + 20 + 18 | 52 → 7 | 7 |
| day_inner | 5 + 8 | 13 | 13 |
| day_mid | 5 + 13 | 18 | 18 |
| month_inner | 1 + 8 | 9 | 9 |
| month_mid | 1 + 9 | 10 | 10 |
| year_inner | 7 + 8 | 15 | 15 |
| year_mid | 7 + 15 | 22 | 22 |
| bottom_inner | 13 + 8 | 21 | 21 |
| bottom_mid | 13 + 21 | 34 → 7 | 7 |
| nw_inner | 6 + 7 | 13 | 13 |
| nw_mid | 6 + 13 | 19 | 19 |
| ne_inner | 8 + 7 | 15 | 15 |
| ne_mid | 8 + 15 | 23 → 5 | 5 |
| se_inner | 20 + 7 | 27 → 9 | 9 |
| se_mid | 20 + 9 | 29 → 11 | 11 |
| sw_inner | 18 + 7 | 25 → 7 | 7 |
| sw_mid | 18 + 7 | 25 → 7 | 7 |
| heart_earth | 8 + 13 | 21 | 21 |
| heart_sky | 8 + 9 | 17 | 17 |
| bridge | 15 + 21 | 36 → 9 | 9 |
| money_center | 15 + 9 | 24 → 6 | 6 |
| love_center | 21 + 9 | 30 → 3 | 3 |
| earth | 5 + 7 | 12 | 12 |
| sky | 1 + 13 | 14 | 14 |
| purpose_personal | 12 + 14 | 26 → 8 | 8 |
| paternal | 6 + 20 | 26 → 8 | 8 |
| maternal | 8 + 18 | 26 → 8 | 8 |
| purpose_social | 8 + 8 | 16 | 16 |
| purpose_spiritual | 8 + 16 | 24 → 6 | 6 |

## 1991-12-09

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 9 | 9 | 9 |
| month | 12 | 12 | 12 |
| year | 1991 | 20 | 20 |
| bottom | 9 + 12 + 20 | 41 → 5 | 5 |
| core | 9 + 12 + 20 + 5 | 46 → 10 | 10 |
| nw | 9 + 12 | 21 | 21 |
| ne | 12 + 20 | 32 → 5 | 5 |
| se | 20 + 5 | 25 → 7 | 7 |
| sw | 5 + 9 | 14 | 14 |
| family_center | 21 + 5 + 7 + 14 | 47 → 11 | 11 |
| day_inner | 9 + 10 | 19 | 19 |
| day_mid | 9 + 19 | 28 → 10 | 10 |
| month_inner | 12 + 10 | 22 | 22 |
| month_mid | 12 + 22 | 34 → 7 | 7 |
| year_inner | 20 + 10 | 30 → 3 | 3 |
| year_mid | 20 + 3 | 23 → 5 | 5 |
| bottom_inner | 5 + 10 | 15 | 15 |
| bottom_mid | 5 + 15 | 20 | 20 |
| nw_inner | 21 + 11 | 32 → 5 | 5 |
| nw_mid | 21 + 5 | 26 → 8 | 8 |
| ne_inner | 5 + 11 | 16 | 16 |
| ne_mid | 5 + 16 | 21 | 21 |
| se_inner | 7 + 11 | 18 | 18 |
| se_mid | 7 + 18 | 25 → 7 | 7 |
| sw_inner | 14 + 11 | 25 → 7 | 7 |
| sw_mid | 14 + 7 | 21 | 21 |
| heart_earth | 10 + 19 | 29 → 11 | 11 |
| heart_sky | 10 + 22 | 32 → 5 | 5 |
| bridge | 3 + 15 | 18 | 18 |
| money_center | 3 + 18 | 21 | 21 |
| love_center | 15 + 18 | 33 → 6 | 6 |
| earth | 9 + 20 | 29 → 11 | 11 |
| sky | 12 + 5 | 17 | 17 |
| purpose_personal | 11 + 17 | 28 → 10 | 10 |
| paternal | 21 + 7 | 28 → 10 | 10 |
| maternal | 5 + 14 | 19 | 19 |
| purpose_social | 10 + 19 | 29 → 11 | 11 |
| purpose_spiritual | 10 + 11 | 21 | 21 |

## 2000-02-29

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 29 | 29 → 11 | 11 |
| month | 2 | 2 | 2 |
| year | 2000 | 2 | 2 |
| bottom | 11 + 2 + 2 | 15 | 15 |
| core | 11 + 2 + 2 + 15 | 30 → 3 | 3 |
| nw | 11 + 2 | 13 | 13 |
| ne | 2 + 2 | 4 | 4 |
| se | 2 + 15 | 17 | 17 |
| sw | 15 + 11 | 26 → 8 | 8 |
| family_center | 13 + 4 + 17 + 8 | 42 → 6 | 6 |
| day_inner | 11 + 3 | 14 | 14 |
| day_mid | 11 + 14 | 25 → 7 | 7 |
| month_inner | 2 + 3 | 5 | 5 |
| month_mid | 2 + 5 | 7 | 7 |
| year_inner | 2 + 3 | 5 | 5 |
| year_mid | 2 + 5 | 7 | 7 |
| bottom_inner | 15 + 3 | 18 | 18 |
| bottom_mid | 15 + 18 | 33 → 6 | 6 |
| nw_inner | 13 + 6 | 19 | 19 |
| nw_mid | 13 + 19 | 32 → 5 | 5 |
| ne_inner | 4 + 6 | 10 | 10 |
| ne_mid | 4 + 10 | 14 | 14 |
| se_inner | 17 + 6 | 23 → 5 | 5 |
| se_mid | 17 + 5 | 22 | 22 |
| sw_inner | 8 + 6 | 14 | 14 |
| sw_mid | 8 + 14 | 22 | 22 |
| heart_earth | 3 + 14 | 17 | 17 |
| heart_sky | 3 + 5 | 8 | 8 |
| bridge | 5 + 18 | 23 → 5 | 5 |
| money_center | 5 + 5 | 10 | 10 |
| love_center | 18 + 5 | 23 → 5 | 5 |
| earth | 11 + 2 | 13 | 13 |
| sky | 2 + 15 | 17 | 17 |
| purpose_personal | 13 + 17 | 30 → 3 | 3 |
| paternal | 13 + 17 | 30 → 3 | 3 |
| maternal | 4 + 8 | 12 | 12 |
| purpose_social | 3 + 12 | 15 | 15 |
| purpose_spiritual | 3 + 15 | 18 | 18 |

## 2004-02-29

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 29 | 29 → 11 | 11 |
| month | 2 | 2 | 2 |
| year | 2004 | 6 | 6 |
| bottom | 11 + 2 + 6 | 19 | 19 |
| core | 11 + 2 + 6 + 19 | 38 → 11 | 11 |
| nw | 11 + 2 | 13 | 13 |
| ne | 2 + 6 | 8 | 8 |
| se | 6 + 19 | 25 → 7 | 7 |
| sw | 19 + 11 | 30 → 3 | 3 |
| family_center | 13 + 8 + 7 + 3 | 31 → 4 | 4 |
| day_inner | 11 + 11 | 22 | 22 |
| day_mid | 11 + 22 | 33 → 6 | 6 |
| month_inner | 2 + 11 | 13 | 13 |
| month_mid | 2 + 13 | 15 | 15 |
| year_inner | 6 + 11 | 17 | 17 |
| year_mid | 6 + 17 | 23 → 5 | 5 |
| bottom_inner | 19 + 11 | 30 → 3 | 3 |
| bottom_mid | 19 + 3 | 22 | 22 |
| nw_inner | 13 + 4 | 17 | 17 |
| nw_mid | 13 + 17 | 30 → 3 | 3 |
| ne_inner | 8 + 4 | 12 | 12 |
| ne_mid | 8 + 12 | 20 | 20 |
| se_inner | 7 + 4 | 11 | 11 |
| se_mid | 7 + 11 | 18 | 18 |
| sw_inner | 3 + 4 | 7 | 7 |
| sw_mid | 3 + 7 | 10 | 10 |
| heart_earth | 11 + 22 | 33 → 6 | 6 |
| heart_sky | 11 + 13 | 24 → 6 | 6 |
| bridge | 17 + 3 | 20 | 20 |
| money_center | 17 + 20 | 37 → 10 | 10 |
| love_center | 3 + 20 | 23 → 5 | 5 |
| earth | 11 + 6 | 17 | 17 |
| sky | 2 + 19 | 21 | 21 |
| purpose_personal | 17 + 21 | 38 → 11 | 11 |
| paternal | 13 + 7 | 20 | 20 |
| maternal | 8 + 3 | 11 | 11 |
| purpose_social | 20 + 11 | 31 → 4 | 4 |
| purpose_spiritual | 11 + 4 | 15 | 15 |

## 1999-12-31

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 31 | 31 → 4 | 4 |
| month | 12 | 12 | 12 |
| year | 1999 | 28 → 10 | 10 |
| bottom | 4 + 12 + 10 | 26 → 8 | 8 |
| core | 4 + 12 + 10 + 8 | 34 → 7 | 7 |
| nw | 4 + 12 | 16 | 16 |
| ne | 12 + 10 | 22 | 22 |
| se | 10 + 8 | 18 | 18 |
| sw | 8 + 4 | 12 | 12 |
| family_center | 16 + 22 + 18 + 12 | 68 → 14 | 14 |
| day_inner | 4 + 7 | 11 | 11 |
| day_mid | 4 + 11 | 15 | 15 |
| month_inner | 12 + 7 | 19 | 19 |
| month_mid | 12 + 19 | 31 → 4 | 4 |
| year_inner | 10 + 7 | 17 | 17 |
| year_mid | 10 + 17 | 27 → 9 | 9 |
| bottom_inner | 8 + 7 | 15 | 15 |
| bottom_mid | 8 + 15 | 23 → 5 | 5 |
| nw_inner | 16 + 14 | 30 → 3 | 3 |
| nw_mid | 16 + 3 | 19 | 19 |
| ne_inner | 22 + 14 | 36 → 9 | 9 |
| ne_mid | 22 + 9 | 31 → 4 | 4 |
| se_inner | 18 + 14 | 32 → 5 | 5 |
| se_mid | 18 + 5 | 23 → 5 | 5 |
| sw_inner | 12 + 14 | 26 → 8 | 8 |
| sw_mid | 12 + 8 | 20 | 20 |
| heart_earth | 7 + 11 | 18 | 18 |
| heart_sky | 7 + 19 | 26 → 8 | 8 |
| bridge | 17 + 15 | 32 → 5 | 5 |
| money_center | 17 + 5 | 22 | 22 |
| love_center | 15 + 5 | 20 | 20 |
| earth | 4 + 10 | 14 | 14 |
| sky | 12 + 8 | 20 | 20 |
| purpose_personal | 14 + 20 | 34 → 7 | 7 |
| paternal | 16 + 18 | 34 → 7 | 7 |
| maternal | 22 + 12 | 34 → 7 | 7 |
| purpose_social | 7 + 7 | 14 | 14 |
| purpose_spiritual | 7 + 14 | 21 | 21 |

## 1900-01-01

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 1 | 1 | 1 |
| month | 1 | 1 | 1 |
| year | 1900 | 10 | 10 |
| bottom | 1 + 1 + 10 | 12 | 12 |
| core | 1 + 1 + 10 + 12 | 24 → 6 | 6 |
| nw | 1 + 1 | 2 | 2 |
| ne | 1 + 10 | 11 | 11 |
| se | 10 + 12 | 22 | 22 |
| sw | 12 + 1 | 13 | 13 |
| family_center | 2 + 11 + 22 + 13 | 48 → 12 | 12 |
| day_inner | 1 + 6 | 7 | 7 |
| day_mid | 1 + 7 | 8 | 8 |
| month_inner | 1 + 6 | 7 | 7 |
| month_mid | 1 + 7 | 8 | 8 |
| year_inner | 10 + 6 | 16 | 16 |
| year_mid | 10 + 16 | 26 → 8 | 8 |
| bottom_inner | 12 + 6 | 18 | 18 |
| bottom_mid | 12 + 18 | 30 → 3 | 3 |
| nw_inner | 2 + 12 | 14 | 14 |
| nw_mid | 2 + 14 | 16 | 16 |
| ne_inner | 11 + 12 | 23 → 5 | 5 |
| ne_mid | 11 + 5 | 16 | 16 |
| se_inner | 22 + 12 | 34 → 7 | 7 |
| se_mid | 22 + 7 | 29 → 11 | 11 |
| sw_inner | 13 + 12 | 25 → 7 | 7 |
| sw_mid | 13 + 7 | 20 | 20 |
| heart_earth | 6 + 7 | 13 | 13 |
| heart_sky | 6 + 7 | 13 | 13 |
| bridge | 16 + 18 | 34 → 7 | 7 |
| money_center | 16 + 7 | 23 → 5 | 5 |
| love_center | 18 + 7 | 25 → 7 | 7 |
| earth | 1 + 10 | 11 | 11 |
| sky | 1 + 12 | 13 | 13 |
| purpose_personal | 11 + 13 | 24 → 6 | 6 |
| paternal | 2 + 22 | 24 → 6 | 6 |
| maternal | 11 + 13 | 24 → 6 | 6 |
| purpose_social | 6 + 6 | 12 | 12 |
| purpose_spiritual | 6 + 12 | 18 | 18 |

## 1988-11-30

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 30 | 30 → 3 | 3 |
| month | 11 | 11 | 11 |
| year | 1988 | 26 → 8 | 8 |
| bottom | 3 + 11 + 8 | 22 | 22 |
| core | 3 + 11 + 8 + 22 | 44 → 8 | 8 |
| nw | 3 + 11 | 14 | 14 |
| ne | 11 + 8 | 19 | 19 |
| se | 8 + 22 | 30 → 3 | 3 |
| sw | 22 + 3 | 25 → 7 | 7 |
| family_center | 14 + 19 + 3 + 7 | 43 → 7 | 7 |
| day_inner | 3 + 8 | 11 | 11 |
| day_mid | 3 + 11 | 14 | 14 |
| month_inner | 11 + 8 | 19 | 19 |
| month_mid | 11 + 19 | 30 → 3 | 3 |
| year_inner | 8 + 8 | 16 | 16 |
| year_mid | 8 + 16 | 24 → 6 | 6 |
| bottom_inner | 22 + 8 | 30 → 3 | 3 |
| bottom_mid | 22 + 3 | 25 → 7 | 7 |
| nw_inner | 14 + 7 | 21 | 21 |
| nw_mid | 14 + 21 | 35 → 8 | 8 |
| ne_inner | 19 + 7 | 26 → 8 | 8 |
| ne_mid | 19 + 8 | 27 → 9 | 9 |
| se_inner | 3 + 7 | 10 | 10 |
| se_mid | 3 + 10 | 13 | 13 |
| sw_inner | 7 + 7 | 14 | 14 |
| sw_mid | 7 + 14 | 21 | 21 |
| heart_earth | 8 + 11 | 19 | 19 |
| heart_sky | 8 + 19 | 27 → 9 | 9 |
| bridge | 16 + 3 | 19 | 19 |
| money_center | 16 + 19 | 35 → 8 | 8 |
| love_center | 3 + 19 | 22 | 22 |
| earth | 3 + 8 | 11 | 11 |
| sky | 11 + 22 | 33 → 6 | 6 |
| purpose_personal | 11 + 6 | 17 | 17 |
| paternal | 14 + 3 | 17 | 17 |
| maternal | 19 + 7 | 26 → 8 | 8 |
| purpose_social | 17 + 8 | 25 → 7 | 7 |
| purpose_spiritual | 17 + 7 | 24 → 6 | 6 |

## 2011-11-11

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 11 | 11 | 11 |
| month | 11 | 11 | 11 |
| year | 2011 | 4 | 4 |
| bottom | 11 + 11 + 4 | 26 → 8 | 8 |
| core | 11 + 11 + 4 + 8 | 34 → 7 | 7 |
| nw | 11 + 11 | 22 | 22 |
| ne | 11 + 4 | 15 | 15 |
| se | 4 + 8 | 12 | 12 |
| sw | 8 + 11 | 19 | 19 |
| family_center | 22 + 15 + 12 + 19 | 68 → 14 | 14 |
| day_inner | 11 + 7 | 18 | 18 |
| day_mid | 11 + 18 | 29 → 11 | 11 |
| month_inner | 11 + 7 | 18 | 18 |
| month_mid | 11 + 18 | 29 → 11 | 11 |
| year_inner | 4 + 7 | 11 | 11 |
| year_mid | 4 + 11 | 15 | 15 |
| bottom_inner | 8 + 7 | 15 | 15 |
| bottom_mid | 8 + 15 | 23 → 5 | 5 |
| nw_inner | 22 + 14 | 36 → 9 | 9 |
| nw_mid | 22 + 9 | 31 → 4 | 4 |
| ne_inner | 15 + 14 | 29 → 11 | 11 |
| ne_mid | 15 + 11 | 26 → 8 | 8 |
| se_inner | 12 + 14 | 26 → 8 | 8 |
| se_mid | 12 + 8 | 20 | 20 |
| sw_inner | 19 + 14 | 33 → 6 | 6 |
| sw_mid | 19 + 6 | 25 → 7 | 7 |
| heart_earth | 7 + 18 | 25 → 7 | 7 |
| heart_sky | 7 + 18 | 25 → 7 | 7 |
| bridge | 11 + 15 | 26 → 8 | 8 |
| money_center | 11 + 8 | 19 | 19 |
| love_center | 15 + 8 | 23 → 5 | 5 |
| earth | 11 + 4 | 15 | 15 |
| sky | 11 + 8 | 19 | 19 |
| purpose_personal | 15 + 19 | 34 → 7 | 7 |
| paternal | 22 + 12 | 34 → 7 | 7 |
| maternal | 15 + 19 | 34 → 7 | 7 |
| purpose_social | 7 + 7 | 14 | 14 |
| purpose_spiritual | 7 + 14 | 21 | 21 |

## 1900-02-28

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 28 | 28 → 10 | 10 |
| month | 2 | 2 | 2 |
| year | 1900 | 10 | 10 |
| bottom | 10 + 2 + 10 | 22 | 22 |
| core | 10 + 2 + 10 + 22 | 44 → 8 | 8 |
| nw | 10 + 2 | 12 | 12 |
| ne | 2 + 10 | 12 | 12 |
| se | 10 + 22 | 32 → 5 | 5 |
| sw | 22 + 10 | 32 → 5 | 5 |
| family_center | 12 + 12 + 5 + 5 | 34 → 7 | 7 |
| day_inner | 10 + 8 | 18 | 18 |
| day_mid | 10 + 18 | 28 → 10 | 10 |
| month_inner | 2 + 8 | 10 | 10 |
| month_mid | 2 + 10 | 12 | 12 |
| year_inner | 10 + 8 | 18 | 18 |
| year_mid | 10 + 18 | 28 → 10 | 10 |
| bottom_inner | 22 + 8 | 30 → 3 | 3 |
| bottom_mid | 22 + 3 | 25 → 7 | 7 |
| nw_inner | 12 + 7 | 19 | 19 |
| nw_mid | 12 + 19 | 31 → 4 | 4 |
| ne_inner | 12 + 7 | 19 | 19 |
| ne_mid | 12 + 19 | 31 → 4 | 4 |
| se_inner | 5 + 7 | 12 | 12 |
| se_mid | 5 + 12 | 17 | 17 |
| sw_inner | 5 + 7 | 12 | 12 |
| sw_mid | 5 + 12 | 17 | 17 |
| heart_earth | 8 + 18 | 26 → 8 | 8 |
| heart_sky | 8 + 10 | 18 | 18 |
| bridge | 18 + 3 | 21 | 21 |
| money_center | 18 + 21 | 39 → 12 | 12 |
| love_center | 3 + 21 | 24 → 6 | 6 |
| earth | 10 + 10 | 20 | 20 |
| sky | 2 + 22 | 24 → 6 | 6 |
| purpose_personal | 20 + 6 | 26 → 8 | 8 |
| paternal | 12 + 5 | 17 | 17 |
| maternal | 12 + 5 | 17 | 17 |
| purpose_social | 17 + 17 | 34 → 7 | 7 |
| purpose_spiritual | 8 + 7 | 15 | 15 |

## 1983-11-07

| Formula | Operands | Raw and reductions | Result |
|---|---|---|---:|
| day | 7 | 7 | 7 |
| month | 11 | 11 | 11 |
| year | 1983 | 21 | 21 |
| bottom | 7 + 11 + 21 | 39 → 12 | 12 |
| core | 7 + 11 + 21 + 12 | 51 → 6 | 6 |
| nw | 7 + 11 | 18 | 18 |
| ne | 11 + 21 | 32 → 5 | 5 |
| se | 21 + 12 | 33 → 6 | 6 |
| sw | 12 + 7 | 19 | 19 |
| family_center | 18 + 5 + 6 + 19 | 48 → 12 | 12 |
| day_inner | 7 + 6 | 13 | 13 |
| day_mid | 7 + 13 | 20 | 20 |
| month_inner | 11 + 6 | 17 | 17 |
| month_mid | 11 + 17 | 28 → 10 | 10 |
| year_inner | 21 + 6 | 27 → 9 | 9 |
| year_mid | 21 + 9 | 30 → 3 | 3 |
| bottom_inner | 12 + 6 | 18 | 18 |
| bottom_mid | 12 + 18 | 30 → 3 | 3 |
| nw_inner | 18 + 12 | 30 → 3 | 3 |
| nw_mid | 18 + 3 | 21 | 21 |
| ne_inner | 5 + 12 | 17 | 17 |
| ne_mid | 5 + 17 | 22 | 22 |
| se_inner | 6 + 12 | 18 | 18 |
| se_mid | 6 + 18 | 24 → 6 | 6 |
| sw_inner | 19 + 12 | 31 → 4 | 4 |
| sw_mid | 19 + 4 | 23 → 5 | 5 |
| heart_earth | 6 + 13 | 19 | 19 |
| heart_sky | 6 + 17 | 23 → 5 | 5 |
| bridge | 9 + 18 | 27 → 9 | 9 |
| money_center | 9 + 9 | 18 | 18 |
| love_center | 18 + 9 | 27 → 9 | 9 |
| earth | 7 + 21 | 28 → 10 | 10 |
| sky | 11 + 12 | 23 → 5 | 5 |
| purpose_personal | 10 + 5 | 15 | 15 |
| paternal | 18 + 6 | 24 → 6 | 6 |
| maternal | 5 + 19 | 24 → 6 | 6 |
| purpose_social | 6 + 6 | 12 | 12 |
| purpose_spiritual | 15 + 12 | 27 → 9 | 9 |
