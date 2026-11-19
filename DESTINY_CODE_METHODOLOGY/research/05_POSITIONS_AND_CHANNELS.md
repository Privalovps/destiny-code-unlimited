# Positions and channels

All IDs identify roles, not just numbers. Full definitions, roles, provenance and coordinates are in data/positions.json; channels and reading orders are in data/channels.json. Coordinates are a new layout in a unit square; they are not copied source illustration coordinates.

## Complete computed-value catalog

| ID | Display name | Formula inputs | Domain | C worked value | Diagram |
|---|---|---|---|---:|---|
| day | Birth-day portrait | dayOfMonth | portrait | 9 | [-1, 0] |
| month | Month / spiritual inspiration | monthOfYear | talent | 12 | [0, -1] |
| year | Year / material learning | yearNumber | money | 20 | [1, 0] |
| bottom | Main learning point | day + month + year | growth | 5 | [0, 1] |
| core | Personal center | day + month + year + bottom | core | 10 | [0, 0] |
| nw | Paternal upper corner | day + month | family | 21 | [-0.72, -0.72] |
| ne | Maternal upper corner | month + year | family | 5 | [0.72, -0.72] |
| se | Paternal lower corner | year + bottom | family | 7 | [0.72, 0.72] |
| sw | Maternal lower corner | bottom + day | family | 14 | [-0.72, 0.72] |
| family_center | Ancestral resource aggregate | nw + ne + se + sw | family | 11 | Detached aggregate |
| day_inner | Family relationship inner point | day + core | family | 19 | [-0.55, 0.0] |
| day_mid | Family relationship middle point | day + day_inner | family | 10 | [-0.78, 0.0] |
| month_inner | Talent inner point | month + core | talent | 22 | [0.0, -0.55] |
| month_mid | Talent middle point | month + month_inner | talent | 7 | [0.0, -0.78] |
| year_inner | Material pattern inner point | year + core | money | 3 | [0.55, 0.0] |
| year_mid | Material pattern middle point | year + year_inner | money | 5 | [0.78, 0.0] |
| bottom_inner | Karmic pattern inner point | bottom + core | growth | 15 | [0.0, 0.55] |
| bottom_mid | Karmic pattern middle point | bottom + bottom_inner | growth | 20 | [0.0, 0.78] |
| nw_inner | Paternal upper inner point | nw + family_center | family | 5 | [-0.396, -0.396] |
| nw_mid | Paternal upper middle point | nw + nw_inner | family | 8 | [-0.562, -0.562] |
| ne_inner | Maternal upper inner point | ne + family_center | family | 16 | [0.396, -0.396] |
| ne_mid | Maternal upper middle point | ne + ne_inner | family | 21 | [0.562, -0.562] |
| se_inner | Paternal lower inner point | se + family_center | family | 18 | [0.396, 0.396] |
| se_mid | Paternal lower middle point | se + se_inner | family | 7 | [0.562, 0.562] |
| sw_inner | Maternal lower inner point | sw + family_center | family | 7 | [-0.396, 0.396] |
| sw_mid | Maternal lower middle point | sw + sw_inner | family | 21 | [-0.562, 0.562] |
| heart_earth | Heart desire, Earth axis | core + day_inner | desire | 11 | [-0.28, 0] |
| heart_sky | Heart desire, Sky axis | core + month_inner | desire | 5 | [0, -0.28] |
| bridge | Relationship–money bridge | year_inner + bottom_inner | balance | 18 | [0.28, 0.28] |
| money_center | Money-channel midpoint | year_inner + bridge | money | 21 | [0.415, 0.14] |
| love_center | Relationship-channel midpoint | bottom_inner + bridge | relationship | 6 | [0.14, 0.415] |
| earth | Earth aggregate | day + year | purpose | 11 | Detached aggregate |
| sky | Sky aggregate | month + bottom | purpose | 17 | Detached aggregate |
| purpose_personal | Personal purpose | earth + sky | purpose | 10 | Detached aggregate |
| paternal | Paternal aggregate | nw + se | purpose | 10 | Detached aggregate |
| maternal | Maternal aggregate | ne + sw | purpose | 19 | Detached aggregate |
| purpose_social | Social purpose | paternal + maternal | purpose | 11 | Detached aggregate |
| purpose_spiritual | Spiritual purpose | purpose_personal + purpose_social | purpose | 21 | Detached aggregate |

## Channel order is not interchangeable

| Channel | Physical diagram order | Interpretation sequence |
|---|---|---|
| Parent–child reflection | day → day_mid → day_inner | day → day_inner → day_mid |
| Talents and expression | month → month_mid → month_inner | month → month_inner → month_mid |
| Material patterns | year → year_mid → year_inner | year → year_inner → year_mid |
| Karmic learning pattern | bottom → bottom_mid → bottom_inner | bottom → bottom_inner → bottom_mid |
| NW lineage triad | nw → nw_mid → nw_inner | nw → nw_inner → nw_mid |
| NE lineage triad | ne → ne_mid → ne_inner | ne → ne_inner → ne_mid |
| SE lineage triad | se → se_mid → se_inner | se → se_inner → se_mid |
| SW lineage triad | sw → sw_mid → sw_inner | sw → sw_inner → sw_mid |
| Money and work | year_inner → money_center → bridge | year_inner → money_center → bridge |
| Partnership | bottom_inner → love_center → bridge | bottom_inner → love_center → bridge |
| Relationship–money line | bottom_inner → love_center → bridge → money_center → year_inner | bottom_inner → love_center → bridge → money_center → year_inner |
| Paternal axis | nw → core → se | nw → se |
| Maternal axis | ne → core → sw | ne → sw |
| Earth axis | day → day_mid → day_inner → heart_earth → core → year_inner → year_mid → year | day → year |
| Sky axis | month → month_mid → month_inner → heart_sky → core → bottom_inner → bottom_mid → bottom | month → bottom |
| Karmic learning triad | bottom → bottom_mid → bottom_inner | bottom → bottom_inner → bottom_mid |
| Family branch nw | nw → nw_mid → nw_inner | nw → nw_inner → nw_mid |
| Family branch ne | ne → ne_mid → ne_inner | ne → ne_inner → ne_mid |
| Family branch se | se → se_mid → se_inner | se → se_inner → se_mid |
| Family branch sw | sw → sw_mid → sw_inner | sw → sw_inner → sw_mid |
| Money channel | year_inner → money_center → bridge | year_inner → bridge → money_center |
| Relationship channel | bottom_inner → love_center → bridge | bottom_inner → bridge → love_center |
| Earth axis | day → core → year | day → year → earth |
| Sky axis | month → core → bottom | month → bottom → sky |

## Position-specific constructive and shadow readings

For a calculated value N at node P, load arcana[N], then the P domain text and P role. A constructive description comes from that archetype's constructive theme expressed in the node's domain; a shadow is an alternative possibility, never an observed state. The reader sees the node name, number and symbolic theme so a conclusion is traceable.
Example: in C's 1991 chart, month_inner=22 is self-expression: experiment and improvise while keeping promises. In the same chart bottom=5 is learning: revise a rule rather than use it to end discussion. Reading both as general personality paragraphs would lose their actual roles. The top talent midpoint is 7 (skills), not the top inner point 22 (expression).
The same 5 at bottom and ne does not establish the same behavior in two people. It creates two symbolic applications: a personal learning pattern and a maternal upper-branch theme. Counting both is structural recurrence, not evidence about the mother.
Family branches are C-specific: each outer corner combines with family_center. An A/B variant must recalculate all four inner/middle branches and use its own version metadata. It may not inherit a cached C branch reading.
Heart points belong to desire, not romance compatibility or cardiology. The family aggregate and seven purpose/line aggregates are detached labels/panels. Do not draw them on top of core or count them as more physical nodes.
