# Landing hero — reference-led editorial redesign

## Scope and references

Inspected the actual `public/references/hero-reference.png` and `public/references/sculpture-reference.png`. The first has oversized, overlapping high-contrast lettering, a cropped antique-gold celestial wheel and a silver foreground object on charcoal green. The second has a winged figure, an elongated silhouette, modeled surfaces and a draped lower form. Neither image is rendered by the implementation; usage rights for the reference artwork were not established.

The hero interprets those principles with its own typography, a 22-sector ornamental wheel and an original folded-wing SVG composition. The latter is an abstract silver/stone ornament, not a copy of the reference figure or a newly generated full sculpture. No remote artwork, stock image or raster generator is used.

Only the homepage hero was replaced. The remainder of the homepage, header, theme preference mechanism, results, reports, PDF and payment gates remain unchanged. The real nine-position example is retained in an accessible native disclosure within the hero. Decorative divisions are not additional calculated positions.

## Implementation

- `landing-hero.tsx`: server-rendered editorial composition, supplied copy, live birth form, native sample-chart disclosure, existing local-preview link.
- `hero-artwork.tsx`: original server-rendered SVG wheel and folded-wing ornament with no pointer loop, timers, external requests or state updates. The wheel has exactly 22 decorative sectors.
- `landing-hero.module.css`: hero-scoped charcoal-green/ivory/gold palette and warm-ivory/forest light variant, fluid display typography, staggered one-shot entrances and reduced-motion rules. The wheel is deliberately cropped on the right; headline and controls remain inside the content area. Mobile uses a dedicated artwork interval rather than shrinking the desktop arrangement.
- `birth-form.tsx`: optional submit label only. Existing validation, pending transition and result navigation are unchanged. Other callers retain their previous label.
- `page.tsx`: replaces only the old hero with LandingHero; subsequent homepage sections are preserved byte-for-byte.

## Typography

The hero uses native `Bodoni 72`, `Didot`, `Bodoni MT`, then Times/serif fallbacks. Bodoni 72 and Didot files are present in this Mac's system fonts. No system font binaries are copied or distributed. A Bodoni Moda download was attempted but the sandbox could not resolve fonts.googleapis.com; no external font request is included in the website. Rendering varies with installed fonts on other devices, so cross-platform visual verification remains necessary. Desktop display sizes reach 150px, with a separate mobile scale and optical second-line offset.

## Verification and manual preview

TypeScript no-emit, relevant lint, CSS parsing and scope checks are recorded in the task handoff. No development server, build, browser automation, agents or dependency installation was launched. No claim of rendered visual verification is made.

Manually run one Webpack server:

```sh
cd ~/Desktop/Isoteric
npm run dev:preview
```

Open http://localhost:3000. Check 375px, 768px and 1440px in both themes. Inspect headline edges/descenders, ornament overlap, date picker, CTA, keyboard focus, reduced motion, disclosure chart and local-preview link. Submit 1993-04-17 and an invalid date to verify the preserved flow. Verify the rest of the site and global header retain their prior appearance. Stop the server before starting any other development command.
