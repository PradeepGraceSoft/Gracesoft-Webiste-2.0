# Operations screenshot viewer QA — 2026-11-04

Expanded the local preview and editable operations module to six tabs matching the six feature cards. Reservations retains the calendar; Front desk retains the dashboard. Housekeeping, Billing and payments, Point of sale, and Reporting use local SVG wireframe placeholders explicitly labeled as placeholders. Labels, images, alt text and captions are editor fields.

Verified all six tabs switch to one visible panel and every image decodes at 1440, 390 and 320 CSS pixels. Home and ArrowLeft wrapping work. All six panels remain visible without JavaScript. No document overflow at tested widths. Inspected desktop and mobile screenshots. Evidence: working/preview/operations-six-tabs-qa.json and operations-six-tabs-1440.png / operations-six-tabs-390.png.

Portal/editor validation remains pending. Placeholder images need replacement before release. Local files only; not deployed.
