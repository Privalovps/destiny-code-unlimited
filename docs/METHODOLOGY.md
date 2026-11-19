# Destiny Code — current method release policy

The new local candidate is **Role-Based 22-Archetype Reflection**, method `dc-symbolic-1.0.0-proposed`, calculation profile `C-family-center-v1`. It uses the supplied research package as the source of truth. Justice is 8, Strength 11 and the Fool 22. The candidate has 38 values: 30 diagram nodes, one separate family-resource aggregate and seven line/purpose aggregates.

The original nine-value arithmetic is retained for historical v4 orders and production until release review. No historical purchase is silently upgraded. Source and content versions are separate; see [migration](METHODOLOGY_MIGRATION.md).

## Reduction and date input

Keep integers 1–22 unchanged. Above 22, add decimal digits repeatedly until the result is within that range. Add a formula's complete specified operands before reduction. Named intermediate values, such as Earth/Sky, are already reduced inputs to the next formula. R(20+20+10)=5, whereas premature R(R(20+20)+10)=14 is not the same calculation.

Parse Gregorian YYYY-MM-DD as exact calendar components, years 0001–9999. Reject impossible dates and extra whitespace/newlines. The pure calculator accepts that complete year range without a clock. Product entry additionally rejects future birthdays through the existing UTC calendar rule. Never parse a birth date into a timestamp.

## Complete construction

The main anchors are reduced day, month, reduced year-digit sum, their complete reduced sum at the bottom, and the personal center from all four anchors. Four corners reduce adjacent anchors. The family-resource aggregate reduces all four corners together.

Cardinal inner points add their anchor to the personal center; cardinal middle points add their anchor to that inner point. Ancestral inner points add their corner to the **family aggregate**; ancestral middle points add their corner to that inner point. Do not substitute the personal center in those four branches. The A/B personal-center variant is comparison-only.

Earth/Sky desire points add the personal center to the day/month inner points. The relationship–resource bridge adds year-inner and bottom-inner. Money/love midpoints add the corresponding entry to that bridge. Earth combines day/year; Sky combines month/bottom; personal purpose combines reduced Earth/Sky. Paternal and maternal aggregates combine opposite corners; social purpose combines them; spiritual purpose combines personal/social purpose.

Exact inputs and all reduction traces: `DESTINY_CODE_METHODOLOGY/data/calculation_rules.json`, `test_cases.json` and `research/04_FORMULAS.md`.

## Interpretation

The arcanum supplies a theme, its position supplies a domain/role, and only declared channels supply reading sequences. The exact learning key is bottom → inner → middle, never sorted or reversed. A missing named key produces an explicitly general bottom-theme reading. Generic program matching stays disabled. Recurrence uses distinct primary nodes only, at most two themes. Contrasts use only the six supplied pairs within a section, at most one per section.

Customer prose omits raw function names, source IDs, authors, research instructions and bibliographies. Advanced details show human-readable arithmetic using the same data. Internal blocks retain source/page provenance, formula/combination IDs and all version/hash fields. The framework draws from inherited Destiny Matrix traditions; original English composition does not establish scientific validity or official affiliation.

## Shared surfaces and historical boundary

Free results expose only day/core introductory meanings and public chart metadata. Full arbitrary-date reports and PDFs still require the original server entitlement checks. `/report/demo` and its two PDF editions are fixed to 1991-12-09 for the candidate. They accept no arbitrary DOB override.

The new model has ten topical chapters and one calculation appendix. Web and Light/Dark PDF plans use the same semantic document/hash. Colors and pagination are outside the hash. No runtime AI or external API is used.

See [professional specification](PROFESSIONAL_METHODOLOGY.md), [traceability](REPORT_TRACEABILITY_AUDIT.md), [implementation](RESEARCH_C_IMPLEMENTATION.md) and the archived [v4 methodology](history/METHODOLOGY_V4.md).
