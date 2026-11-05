# Homepage to 3D design content map

Reviewed **2026-11-05** against the [live GraceSoft homepage](https://www.gracesoft.com/) and linked product pages. Local template/modules remain the release source; the browser preview is an approximation of HubL output. All modules are independent, editable content sections inside the isolated `3D design` theme.

| Existing section / requested role | New module | Content handling | Evidence and destination |
| --- | --- | --- | --- |
| Product, solutions, resources, pricing and customer navigation | `navigation.module` | Nine product routes, local section links, pricing, login and primary demo. Preserve existing authenticated entry point without exercising login. | Current public navigation; `/pricing`, `/livedemo`, `https://apps.gracesoft.com/pmsui/`. |
| Broad PMS hero | `hero.module` | Short hospitality headline, explicit product/category/audience, demo/platform CTAs, original 3D hotel with illustrative operations overlays. Scene is not presented as a screenshot or customer property. | `/hotel-management-software`, `/unified-inbox`; CTA `/livedemo`. Benefit language remains editorial review copy. |
| Definition, key benefits and trust context | `overview.module` | One direct-answer product definition and visible configuration qualification. Links to PMS, booking, channels and inbox. | `/hotel-management-software`, `/online-booking-engine`, `/channel-manager`, `/unified-inbox`. |
| PMS, booking engine, channel manager, housekeeping, payments, POS, guest CRM, inbox, AI | `platform.module` | Nine selectable capability panels with task-focused summaries and descriptive links. Full content remains in HTML for progressive enhancement. Avoid unsupported inclusion, security, sync and AI outcome promises. | Nine source routes listed in `content-evidence.md`; each panel links to its detail page. |
| How the connected software supports a stay | `journey.module` | Three steps: capture a booking, coordinate a stay, continue a guest relationship. Avoid invented growth statistics. | Booking-engine, hotel-management and CRM product pages. |
| Property-type navigation | `properties.module` | Hotels/motels, boutique hotels, inns/B&Bs, resorts, vacation rentals, campgrounds/RV, multi-property, condos, and guest ranches remain discoverable. | Current property routes, with resorts linked to hotel management and separate ranch link to `/dude-rancher-software`. |
| Product preview tabs | `screenshots.module` | Authentic calendar and dashboard assets, descriptive alternatives, configuration caption, screenshot enlargement and demo link. | Current homepage screenshots; provenance script `working/preview/fetch-atelier-assets.cjs`. Rights/currentness review pending. |
| Why GraceSoft / cloud / onboarding and support | `why.module` | Concrete connected-workflow, cloud, configuration and support-conversation framing. No age/award/support-hour guarantees. | Hotel-management, contact and public Support Center sources. |
| Testimonials/customer evidence | `stories.module` | Two source-linked properties. Exact short quote candidates stored with `approved: false`; quotes remain hidden until approved. No invented ratings, names or photos. | `/testimonials`; Dow attribution corroborated by `/hotel-management-software`. |
| Latest articles | `insights.module` | Three real articles with source dates: 2026-03-05, 2025-11-18, 2025-10-07. Editorial summaries and descriptive links. | `/blog` and three verified article URLs in the evidence report. |
| FAQ | `faq.module` | Ten concise buyer questions on identity, properties, cloud, portfolios, booking, channels, payments/housekeeping, AI/messages, support, and demo/pricing. Qualified answers replace legacy editorial notes and guarantees. | Relevant product pages, `/livedemo`, `/pricing` and `/corporate-contact`. |
| Final demo conversion | `final-cta.module` | Existing demo journey plus pricing; no mock submission form, CRM event or production test lead. | `/livedemo`, `/pricing`. |
| Corporate/contact/product/resource/legal footer | `footer.module` | Source-checked address/email/phone, nine product links, company/resource routes and existing privacy-statement destination. | `/corporate-contact`, `/privacy-statement`, public site navigation and Support Center. |

## Deliberate differences and review exceptions

- The 3D concept is a new local design direction authorized by the current request. It is not an assertion that this palette/layout replaced the Atelier or active `Act3` theme.
- The user requested since-1999/company-age proof and integration logos. Those are held until current company evidence, connection scope and asset permissions are approved. The design retains discoverability of integrations through channel-manager links.
- A quote carousel is not necessary while quote permissions are pending. The source-linked customer section remains useful without auto-rotation or invented proof.
- The hero uses an original geometry-based hospitality illustration. Actual product screenshots are shown in their own named section; the illustration is never passed off as the live interface.
- The old long FAQ, duplicated benefits, awards, vague “Get Started” buttons, internal notes, questionable rankings, comparisons and guarantees are not reproduced.
- No robots, sitemap, canonical, analytics, live-form or global portal settings were changed. Metadata/indexing decisions belong to later approved page setup and portal QA.
- The archive's expected inventory and theme-selection documents were missing in the current checkout. The existing read-only export was located under `docs/Hubspot Existing Page Export/`; current public evidence takes precedence over filenames or static export metadata.

## Link evidence

`public-link-audit.json` records a native PowerShell GET check of every unique external default URL in the new module fields on 2026-11-05: **30 public URLs returned HTTP 200**, with the same final URL and no redirect observed. The customer login URL was confirmed directly in public homepage HTML; the authenticated workflow was deliberately not exercised. No JavaScript, form submission or CRM lead creation was used in this check.

Repeat the external link check immediately before an approved release. Local fragment/keyboard/navigation behavior and rendered responsive QA belong to the page-specific QA report.
