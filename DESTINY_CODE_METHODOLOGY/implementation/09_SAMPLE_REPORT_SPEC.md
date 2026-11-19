# Public sample synchronization

The recommended research fixture is **1991-12-09**, because C:9–42 supplies a complete worked chart. The accompanying `SAMPLE_COMPLETE_READING.md` is generated from the reference calculator and role-based data, not copied from a book. `SAMPLE_FREE_PREVIEW.md` is deliberately smaller.

If the current public sample uses another date, inspect its actual route and all incoming links before changing it. A stable source-verified sample date is a recommendation, not a claim that the current application already uses this date. Retaining another date is acceptable if it is calculated and composed by the shared engine and receives its own regression fixture.

Requirements:

- One fixed, public sample document may contain premium-level prose. It is not an entitlement for arbitrary dates.
- Generate the public sample from the same versioned `ReportModel` as paid readings, including family-center ancestry and the correct ordered key.
- Route, chart, headings, table values, downloadable Light/Dark samples and marketing screenshots must agree.
- Attach sample date, method version, content version, locale and source-data checksum to the generated sample.
- Never accept an arbitrary DOB together with `isSample=true` as a premium bypass. Never expose paid generation through an unguarded sample endpoint.
- A displayed chapter count is derived from the section manifest; do not leave hard-coded eight-chapter promises if the new structure is adopted.
- The example is illustrative; do not describe it as a testimonial or actual person's verified life.

Acceptance checks compare the normalized report AST from web and both PDFs; they are not limited to a visual resemblance. Dark versus Light changes presentation tokens, not wording or data. Any cached sample must be invalidated when its method or content hash changes.
