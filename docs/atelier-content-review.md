# Atelier content refresh — 30 October 2026

READY FOR REVIEW — NOT DEPLOYED

## Deliverables

- `working/preview/home-v2-atelier-content.html`: independent copy with the requested content rewrite.
- `working/theme/gracesoft-atelier-content-dev/`: independent HubSpot source, 12 `gs-content-*.module` sections, editable text/link/image fields, a drag-and-drop homepage and copied animation assets.
- `working/preview/build-atelier-content.cjs`: reproducible content and section generation.
- `working/preview/atelier-content-1440.png` and `atelier-content-390.png`: rendered screenshots.
- `working/preview/atelier-content-{qa,motion-qa,links,audit}.json`: executed checks.

Original Atelier preview and theme are preserved; previous designs are not modified. No HubSpot upload, account change, activation or publication occurred.

## Structure and changes

The existing static/HubL architecture, tokens, responsive CSS, semantic FAQ, navigation and scroll behavior were inspected and reused. The original ten-section concept repeated general product explanations and lacked dedicated direct booking, integration and decision-support content. It used conceptual product illustrations and understated AI.

The new sequence follows the attached brief: (1) hero, (2) connected platform, (3) AI, (4) operations, (5) direct bookings, (6) eight property categories, (7) integrations, (8) product showcase, (9) customer trust, (10) why GraceSoft, (11) eleven FAQs, (12) final CTA.

Merged the separate definition into the platform introduction. Replaced the generic connected-capability list with six product categories. Moved AI ahead of daily operations. Added direct booking and website solutions, multi-property navigation, named integration examples and concise decision-support content. Replaced conceptual calendar artwork with actual public product screenshots. Preserved a labeled conceptual AI workflow. Revised the hotel-focused positioning to cover the wider lodging audience.

Hero uses the requested headline and copy. Primary demo destination remains `/livedemo`; secondary hero action targets `#platform`. Pricing remains in navigation/footer. Final actions are Schedule a Demo and Contact Our Team. Corrected inherited Login and Privacy destinations only in this new copy using the current public navigation.

## Sources and claim review

Retrieved the public homepage on 2026-10-30. Source HTML is saved at `working/preview/atelier-content-source.html`. The owner's attached brief is the content specification, including the 25-year positioning.

| Content | Source and handling |
| --- | --- |
| Core platform, AI, mobile access, supported property types | https://www.gracesoft.com/ plus owner brief; public-source-supported draft, not independent product certification |
| 25-year experience and trust heading | Owner-provided claim corroborated by current homepage; final publication copy review pending |
| 24/7 AI inquiry handling | Current homepage AI section; phrased as designed capability with configuration qualification, not a support uptime guarantee |
| Booking.com, Expedia, Airbnb, Vrbo | Current homepage channel list; regional/configuration qualification included |
| Stripe, Square, Authorize.Net, Shift4 | Current homepage and https://www.gracesoft.com/payments; no claim of universal availability |
| Multi-property | https://www.gracesoft.com/multi-property |
| Websites | https://www.gracesoft.com/websites |
| Housekeeping | https://www.gracesoft.com/housekeeping |
| Unified inbox | https://www.gracesoft.com/unified-inbox |
| Customer quote | https://www.gracesoft.com/testimonials; exact 17-word excerpt: “The transition with GraceSoft was great, with no issues during onboarding, migration, or training.” Attribution: Amy Vereb, Otter Falls Resort. Reuse approval remains a release check. |

The Resorts and Inns card uses the existing B&B/inn route, with an adjacent resort/campground link. No invented dedicated resort route. Integration names use text, not unapproved logos. Awards and ratings remain omitted because independent substantiation and permission have not been supplied. No bookings, revenue, ranking or conversion improvement is guaranteed.

## Actual image assets

Downloaded public homepage product screenshots into the new theme only:

- Calendar: `https://www.gracesoft.com/hs-fs/hubfs/Screenshot%202025-02-27%20173408.png?width=1200` — 77,410 bytes.
- Dashboard: `https://www.gracesoft.com/hs-fs/hubfs/Screenshot%202025-02-27%20173427.png?width=1200` — 52,820 bytes.

Both were visually inspected. They contain property and guest names already visible in the published source; confirm that these are approved demonstration data before release. No new guest data was created. The local use follows the owner's request for actual product screenshots. Final publication rights/current-product accuracy still need confirmation. Hero loads eagerly; showcase images load lazily. Descriptive alt text and dimensions are provided. Editable HubSpot image fields have theme-local fallbacks.

Only calendar and dashboard screenshots are displayed; the other six requested showcase categories link to verified product pages. Full eight-screen imagery, hospitality photography, integration logo rights and additional permissioned testimonials remain missing assets. No substitutes are presented as actual product evidence.

## SEO / AEO

One H1, section H2s, descriptive H3s, crawlable product links and eleven native disclosure FAQs. The platform definition names vendor, product and property management system explicitly; OTA is expanded in the FAQ. A draft title and meta description are present in the static preview. HubSpot metadata remains owned by page settings and standard includes. No canonical or production indexing settings were changed. The local preview retains noindex/nofollow.

No FAQ or rating schema was added. No special AI indexing files or visibility guarantees. Production structured-data/global-injection review remains pending an authorized rendered environment.

## Executed validation

- `node working/preview/check-atelier-content.cjs`: 320, 360, 390, 768, 1024 and 1440px; no overflow, one H1, valid fragments, no script exceptions. Menu, Escape, FAQ opening and no-JavaScript navigation passed.
- `node working/preview/check-atelier-content-motion.cjs`: reveal transitions, persistent visibility, reduced motion and keyboard-focus visibility passed at desktop/mobile widths.
- `node --use-system-ca working/preview/fetch-atelier-assets.cjs`: all 25 unique linked public destinations returned HTTP 200 after redirects. Login redirected to its public sign-in page; no authentication or form submission performed.
- `node working/preview/audit-atelier-content.cjs`: section/FAQ/module counts, image loading and earlier-file preservation evidence.
- Desktop full-page screenshot reviewed. Existing style contrast evidence remains applicable to unchanged color pairs; this is not a full accessibility audit.

Remaining: screen-reader and zoom review, complete WCAG audit, field CWV, HubL compilation, native editor persistence and final image/claim review. No package build exists for this static/HubL source. Tests use the existing machine-specific Playwright installation documented in earlier reviews.

## Approval boundary

Review the new local copy. A future upload would require explicit authorization naming a new remote theme and any separate unpublished page. Current Act3 configuration stays untouched. This work does not authorize publication.

