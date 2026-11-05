# 3D design content evidence

Reviewed: **5 November 2026 (Asia/Calcutta)**. Scope: read-only public research and local source review. Public marketing statements are evidence of what GraceSoft currently says, not independent proof of a claim or permission to reuse third-party material.

## Source and archive findings

The [live homepage](https://www.gracesoft.com/) still presents the core PMS, booking, distribution, payments, housekeeping, guest CRM, inbox, AI, property segments, screenshots, testimonials, articles, FAQs, and contact information. Its title remains `Hospitality Property Management System | Hotel Front Desk Software`. The page still contains inconsistent product spelling, internal editorial instructions in an FAQ, broad age/support/integration claims, and old award references. None should be copied into the new design as approved claims. The new design uses the provisional project spelling **GraceSoft Easy InnKeeping**.

The read-only archive is actually at `docs/Hubspot Existing Page Export/`, rather than the root path described by older project notes. Its `README.txt` warns that dynamic content may be absent. The expected `docs/export-page-inventory.csv`, `docs/export-analysis.md`, and `docs/theme-selection.md` were not present when searched. Do not infer their contents or reconstruct approval from filenames. A different `docs/migration/page-inventory.csv` exists and is not treated as a replacement for the missing export inventory.

Relevant archive files were located under `docs/Hubspot Existing Page Export/com/gracesoft/www/`: `index.html`, `testimonials.html`, `hotel-management-software.html`, `housekeeping.html`, `channel-manager.html`, and `online-booking-engine.html`. The housekeeping, testimonial, and channel-manager export titles match the current page titles; this does not establish current publication status or live theme association. No archive file was changed.

## Product destinations and safe scope

All destinations below were opened successfully through the web reader on the review date. A subsequent direct HTTP audit confirmed the public default URLs as described below. The implementation should keep claims concise and qualify plan, region, provider, and configuration differences.

An initial sandboxed Node audit could not resolve `www.gracesoft.com` (`ENOTFOUND`). A subsequent authorized read-only native PowerShell check succeeded: **30 public module-default URLs returned HTTP 200**, with unchanged final URLs and no redirects observed. `public-link-audit.json` contains the current successful results. The customer login URL was confirmed from homepage HTML, but the authenticated entry point was not exercised. These HTTP checks executed no JavaScript and submitted no forms. Recheck immediately before release.

| Product | Verified destination | Supported summary for draft copy |
| --- | --- | --- |
| Property management | [Hotel management software](https://www.gracesoft.com/hotel-management-software) | Reservation calendar, room inventory, guest profiles, check-in/check-out, and front-desk tasks. |
| Booking engine | [Online booking engine](https://www.gracesoft.com/online-booking-engine) | Guests can book through a property's website; avoid commission and guaranteed revenue promises. |
| Distribution | [Channel manager](https://www.gracesoft.com/channel-manager) | Coordinate rates, availability, and reservations across supported channels. |
| Housekeeping | [Housekeeping](https://www.gracesoft.com/housekeeping) | Track room status and staff assignments. The current page also contains an irrelevant HubSpot editing sentence; exclude it. |
| Payments | [Payments](https://www.gracesoft.com/payments) | Payment processing through supported providers. Provider/region/channel capabilities vary. Do not copy rates or security guarantees. |
| Point of sale | [POS](https://www.gracesoft.com/point-of-sale-system) | On-property sales and POS/PMS integration options. |
| CRM and loyalty | [Guest CRM](https://www.gracesoft.com/crm-software) | Guest profiles, history, preferences, and follow-up tools. Confirm loyalty scope before publication. |
| Guest messaging | [Unified Inbox](https://www.gracesoft.com/unified-inbox) | Two-way email/text messages and guest communication history. The product page does not establish WhatsApp scope despite broader homepage wording. |
| AI | [AI for hospitality](https://www.gracesoft.com/gracesoft-ai) | Explore AI voice/chat options for inquiries. Do not promise uptime, autonomous bookings, universal inclusion, or outcomes. |

The [channel-manager page](https://www.gracesoft.com/channel-manager) names Booking.com, Airbnb, Expedia, Vrbo, and Google Hotel Search/free booking links. Their names may be shown with a clear availability qualification. Partner status, exact connection mode, current plan/region support, and logo permission still need owner verification. A text list is the conservative default; no invented or substituted partner logos.

## Property and conversion navigation

| Audience/action | Verified destination |
| --- | --- |
| Hotels, motels, boutique hotels, resorts | https://www.gracesoft.com/hotel-management-software |
| Inns / bed and breakfasts | https://www.gracesoft.com/bed-breakfast-reservation-software |
| Vacation rentals | https://www.gracesoft.com/vacation-rental-management-software |
| Campgrounds / RV parks | https://www.gracesoft.com/campground-management-software |
| Condos | https://www.gracesoft.com/condo-management-software |
| Dude / guest ranches | https://www.gracesoft.com/dude-rancher-software |
| Multi-property groups | https://www.gracesoft.com/multi-property |
| Demo | https://www.gracesoft.com/livedemo |
| Pricing | https://www.gracesoft.com/pricing |
| Feature overview | https://www.gracesoft.com/feature-listing |
| About | https://www.gracesoft.com/about |
| Contact | https://www.gracesoft.com/corporate-contact |
| Customer stories | https://www.gracesoft.com/testimonials |
| Terms and privacy | https://www.gracesoft.com/privacy-statement |

The new defaults use `https://support.gracesoft.com/support/home` (HTTP 200) and `https://apps.gracesoft.com/pmsui/` (confirmed verbatim in live homepage HTML). Authentication and support workflows were not exercised. Preserve these entry points, without submitting any production form or creating a test lead.

## Customer proof candidates

The following are exact short excerpts from [GraceSoft testimonials](https://www.gracesoft.com/testimonials), totaling 21 quoted words. Both are **pending customer/owner reuse approval**. Do not imply that their presence on the old website proves new-layout or photo rights.

1. “It’s easy to use, easy to learn, and everything we need.” — Dow Hotel and Conference Center. Aaron Tracey's attribution is corroborated by the [hotel management page](https://www.gracesoft.com/hotel-management-software). Do not add a current tenure, room count, ROI claim, or photo without approval.
2. “The system is very easy to train new staff on.” — The Branson Hotel. No individual speaker is named in the current text; do not invent one.

Safe release default while permission is pending: link to customer stories instead of publishing unapproved quote/photo content. Local review fields may contain these candidates if clearly documented as unapproved and disabled for production by default.

## Published articles

These are the three newest items displayed by the current [blog listing](https://www.gracesoft.com/blog). Dates are the source's displayed publication dates, not generated dates. Categories below are editorial labels for navigation, not assertions about the original taxonomy.

| Title / URL | Published | Suggested label | Original featured image |
| --- | --- | --- | --- |
| [Bed & Breakfast Booking Software: How to Increase Direct Reservations](https://www.gracesoft.com/blog/bed-and-breakfast-booking-software-how-to-increase-direct-reservations) | 5 March 2026 | Direct reservations | `https://www.gracesoft.com/hubfs/Bed-and-Breakfast-Facebook-Page.jpg` |
| [What Is Dude Ranch Software?](https://www.gracesoft.com/blog/what-is-dude-ranch-software) | 18 November 2025 | Property guides | `https://www.gracesoft.com/hubfs/dude%20ranch%20blog%20banner.jpg` |
| [5 Mistakes Hoteliers Make When Managing Reservations (and How to Avoid Them)](https://www.gracesoft.com/blog/5-mistakes-hoteliers-make-when-managing-reservations-and-how-to-avoid-them) | 7 October 2025 | Reservations | `https://www.gracesoft.com/hubfs/5%20Mistakes%20Hoteliers%20Make%20When%20Managing%20Reservations%20and%20How%20to%20Avoid%20Them%20-%20New.png` |

All three articles were opened. Their image URLs were observed in the live homepage; the web image reader returned cache misses, so image bytes/dimensions are not verified by that reader. Confirm locally fetched images and owner rights before release.

## Product and brand assets

Existing local authentic product captures:

- `working/theme/Atelier Theme/assets/calendar.png`: provenance recorded in `working/preview/fetch-atelier-assets.cjs` as `https://www.gracesoft.com/hs-fs/hubfs/Screenshot%202025-02-27%20173408.png?width=1200`. Current homepage labels the same underlying image as the calendar.
- `working/theme/Atelier Theme/assets/dashboard.png`: same script records `https://www.gracesoft.com/hs-fs/hubfs/Screenshot%202025-02-27%20173427.png?width=1200`. Current homepage labels it as the dashboard.
- `working/theme/Atelier Theme/assets/gracesoft-logo-approved.png` and `gracesoft-logo.webp` are available. The filename is not independent rights evidence. Reuse only as the existing GraceSoft brand draft, pending owner review.

The 3D hotel and floating concept cards should be original explanatory graphics. They must not represent a real customer property, actual booking, real guest, live occupancy/revenue, or an authentic software screenshot. Keep any conceptual status data explicitly illustrative and avoid numerical success metrics.

## Contact and legal evidence

The [corporate contact page](https://www.gracesoft.com/corporate-contact) gives **7310 Cortez Rd, Richmond, TX 77469, United States**, **+1-713-981-5300**, **sales@gracesoft.com**, and **support@gracesoft.com**. It also contains `hey@company.com` in a duplicate block; exclude that obvious placeholder. The main footer links to the [privacy statement](https://www.gracesoft.com/privacy-statement) as “Terms and Privacy.” Do not invent a separate terms URL. No usable social-profile link was verified; omit social links until confirmed. The apparent Facebook image in the reader was an analytics pixel, not a company profile.

## Claims requiring approval before release

| Claim/content | Handling | Verification owner |
| --- | --- | --- |
| “Since 1999”, “25+ years”, awards, ratings, customer totals | Excluded. Live wording is inconsistent and not independent evidence. | Company/brand owner |
| Universal feature inclusion, unlimited channels, no extra fees, guaranteed outcomes | Excluded. Link to current pricing and product detail instead. | Product/commercial owner |
| Named integration logos and partnership implications | Use qualified plain names or omit; logos await permission. | Partnerships/product owner |
| 24/7 human support, AI availability, instant sync, no double bookings | Excluded as guarantees. Describe the workflow without an absolute promise. | Product/support owner |
| Security, PCI compliance, competitive rates, payment-provider coverage | Do not promote as verified claims. Link to payments and qualify configuration. | Payments/legal owner |
| Exact testimonials, customer names/photos | Written reuse approval pending; default quote display off. | Customer/marketing owner |
| Product screenshots, GraceSoft logo, blog images | Source located; current product accuracy and reuse rights pending. | Brand/product owner |
| Cloud/mobile/multi-property/AI/loyalty scope | Qualified draft summaries; confirm current plan and configuration. | Product owner |

No remote HubSpot content, assets, settings, or forms were changed. This evidence report does not authorize publication.
