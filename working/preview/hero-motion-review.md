# Hero motion review — 2026-11-05

Scope: local preview only. Existing grid, fonts, palette, CTA destinations and inspected GIF markup retained. No HubSpot writes.

Added CSS variables: `--hero-teal` (#218b85, existing eyebrow teal), `--hero-gold` (#e9dfce, existing warm palette), `--hero-ease` (cubic-bezier(.16,1,.3,1)), and per-word `--word-delay` (450ms plus 30ms per word).

Validation: JavaScript syntax check passed. Installed Chrome through Playwright loaded 320, 390, 768 and 1440px widths without horizontal overflow or page errors. Desktop screenshot inspected. Original property text remains in the H1; decorative replacement is aria-hidden and absolutely positioned. Original GIF dimensions, priority, source and caption retained.

Constraint resolutions: fixed-width word slot uses horizontal scaling for longer words. Static 8px blurred duplicates fade out rather than animating filter. SVG reveal uses scaleX rather than stroke-dashoffset. Gradient text pulses opacity every seven seconds rather than animating background-position. These are deliberate approximations to honor transform/opacity-only animation. No will-change added.

Limitations: LCP/CLS performance has not been measured; entrance animation can affect perceived paint timing. The existing animated GIF remains unchanged, including under reduced motion. No full accessibility certification or HubSpot render validation performed. This enhancement is preview-only.

Reproduce: `node working/preview/check-hero-motion.cjs` (uses this machine's existing Playwright installation and Chrome). Screenshot: `working/preview/hero-motion-review.png`.

READY FOR REVIEW — NOT DEPLOYED
