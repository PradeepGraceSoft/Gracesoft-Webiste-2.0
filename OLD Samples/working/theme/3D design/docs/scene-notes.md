# Original 3D hospitality scene

The hero uses real Three.js geometry, assembled locally for this design. It is an illustrative boutique hotel, not a screenshot, named customer property, or representation of actual operational data.

## Integration

- Entry point: `src/scene.js`. Bundle as an IIFE into `js/scene.bundle.js` with esbuild.
- Dependencies: `three`, `gsap`, and `gsap/ScrollTrigger`. There is no React dependency.
- Root: `[data-hotel-scene]` inside `.hero-stage`. Give the root explicit responsive dimensions before loading the bundle.
- Success: the root receives `data-state="ready"`; its stage receives the `scene-ready` class.
- Failure or WebGL context loss: `data-state="fallback"`; `scene-ready` is removed. Keep the HTML fallback and text available.
- Optional motion control: `button[data-scene-pause]` in the same stage. Its text and `aria-pressed` state update automatically.
- The canvas is decorative and hidden from assistive technology. The HTML must retain all product descriptions, navigation and CTA links.

## Rendering and accessibility

The hotel includes two wings, warm window bays, balcony glazing and rails, roof terraces, a pergola, entry canopy, swimming pool, deck furniture, landscaping and layered island edges. Orbit paths and traveling nodes suggest connected operations without presenting invented data.

The renderer caps pixel ratio at 1.5 on desktop and 1.25 on initial mobile load. Animation caps at 30 frames per second and stops while the scene is offscreen or the document is hidden. A user pause persists when visibility changes. Reduced-motion preferences and widths below 768 pixels use a still 3D view, with no continuous render loop or scroll animation. Live media-query changes are respected. GSAP ScrollTrigger only adjusts the scene angle; it does not pin content, hijack scrolling, or hide page content.

Geometry and materials are reused where practical. Lights do not require shadow maps. The composition has no downloaded model, texture, font or remote asset requests. Resize, context loss, back-forward cache and page teardown are handled explicitly.

## Verification boundary

The source requires a bundled browser test in the parent implementation. This file does not claim measured performance, full WCAG conformance, or HubSpot-rendered validation.
