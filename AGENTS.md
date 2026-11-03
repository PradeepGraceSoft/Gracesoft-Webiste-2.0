# GraceSoft Easy InnKeeping — Homepage V2 | Codex Implementation Instructions

## Workspace-specific operating notes (2026-10-29)

- Read `skills/seo-aeo/SKILL.md`, `skills/hubspot-editable/SKILL.md`, and `skills/accessibility-usability-conversion/SKILL.md` when doing the matching work.
- For all new GraceSoft content, follow `docs/content-strategy-playbook.md` and use `docs/export-page-inventory.csv` to locate read-only export evidence. The restored `Hubspot Existing Page Export/` supersedes older notes saying the export is absent.
- The current folder layout is documented in `README.md`: active V2 source and local previews live under `working/`; the restored read-only archive is `Hubspot Existing Page Export/`; its inventory and review live under `docs/export-page-inventory.csv` and `docs/export-analysis.md`; portal validation records live under `docs/portal-validation/`.
- Theme direction is not final. Review `docs/theme-selection.md` and the local sample before treating palette, type or layout as approved.
- The public route snapshot was refreshed on 2026-10-29; see `docs/baseline-inventory.md`. The owner has since restored `Hubspot Existing Page Export/`; use the reproduced 2026-11-02 inventory/review, while treating export counts and metadata as a static snapshot rather than current status/analytics evidence.
- Preserve any reference/export files as read-only. Do not make up missing page content or infer page-to-theme relationships from old filenames or historical reports.
- Continue to follow all local-only approval gates below. This update does not authorize HubSpot writes.

> **Use this file as the project brief inside VS Code/Codex.**  
> **Status:** LOCAL DEVELOPMENT ONLY — NOT APPROVED FOR HUBSPOT UPLOAD OR PUBLICATION  
> **Scope:** Homepage V2 baseline at `https://www.gracesoft.com/`. Full-site migration is an additional project scope; follow its separate user-provided brief for local planning, while retaining all remote-write approval gates here.  
> **Research snapshot:** 23 October 2026  
> **Owner / reviewer:** GraceSoft website owner / designated approver  
> **Goal:** Rebuild the existing homepage into a polished, accessible, editable, SEO- and AI-discovery-friendly **HubSpot CMS homepage draft**, using the current page as the factual baseline.

---

## 0. NON-NEGOTIABLE SAFETY AND APPROVAL POLICY — READ FIRST

### Owner's strict settings rule (confirmed 2026-10-29)

The owner requires explicit permission **before changing any existing HubSpot files or settings**. This specifically includes the active/default theme, portal or account settings, existing themes/templates/modules/assets, page settings, menus, forms, redirects and domain configuration. Treat this as a standing project rule in every session. A previous approval for an isolated theme upload or unpublished test page does **not** authorize changing any of these settings. If a setting appears wrong or a change seems necessary, leave it untouched, report the observed state and ask for permission naming the exact setting and intended value. Never infer permission from the presence of CLI/MCP access or from an earlier approval for another action.

The HubSpot page editor validation previously created an isolated unpublished draft (page ID `418693666537`) and uploaded a uniquely named development theme under a separate, explicit approval. The owner confirms the portal's original active theme is `Act3` and personally restored it in the HubSpot UI after the development theme appeared active. Treat `Act3` as the current baseline setting. Never change the active theme without further explicit permission.

**You (Codex) are authorized to inspect public webpages, inspect/download HubSpot files in read-only mode, and create/edit LOCAL project files ONLY.**

**You are NOT authorized to:**

- Modify, overwrite, delete, rename, or publish the existing homepage at `https://www.gracesoft.com/`.
- Change *any* existing HubSpot page, template, module, global partial, theme, menu, CRM record, form, configuration, redirect, or asset.
- Upload, watch, deploy, sync, stage, create a draft in the HubSpot portal, or publish anything remotely without **separate explicit human authorization**. A HubSpot **draft** or **staged page** is still a remote write and is NOT permitted in this phase.
- Execute `hs cms upload`, `hs cms watch`, `hs cms delete`, `hs cms mv`, page create/update/publish APIs, write-capable MCP calls, or scripts which do the same. Do not run a write command merely to test access.
- Submit test leads to production forms, trigger real CRM automations, or alter live analytics.
- Create, overwrite, or modify files outside the **new local V2 workspace**, except for saving a deliberately requested read-only export into that workspace.
- Change `robots.txt`, DNS, hosting, redirects, canonical settings, or current HubSpot page settings.
- Treat the presence of HubSpot credentials/MCP tools as permission to write. It is not.

**Approval gates:**

1. **Gate A — Current request:** local source code, local mock preview, audit and QA reports. No HubSpot upload.
2. **Gate B — Only after user explicitly approves a development upload:** may upload to a **new uniquely named test theme** or create a **separate unpublished test page**, following exactly the authorized scope. Still no production URL replacement.
3. **Gate C — Only after a second explicit approval naming the live homepage:** may schedule a production page switch/publish, with backup, rollback and post-launch checklist.

If a task seems to require a remote write, **stop at that boundary**. Explain the required action, the exact target and consequence; prepare the commands for review but DO NOT run them. For maximum protection, use a local offline workspace or read-only access during Gate A. If connected MCP tools have write capability, do not call them.

**Definition of done for this request:** a working local implementation source + review artifacts, not a published website.

---

## 1. How to use this file in VS Code

1. Create an **empty separate folder** called `gracesoft-home-v2` in VS Code. Do not work inside the existing production theme directory.
2. Copy this Markdown file into the folder as **`AGENTS.md`** (Codex reads project-level agent instructions automatically), or keep the descriptive filename and ask Codex to read it explicitly.
3. Open Codex inside VS Code with the workspace set to `gracesoft-home-v2`.
4. Give Codex this exact first message:

   > Read `AGENTS.md` (or `GRACESOFT_HOMEPAGE_CODEX_IMPLEMENTATION.md`, whichever is in this workspace) completely and implement the homepage V2 in this workspace. This is **LOCAL CODE ONLY**. First inspect the public GraceSoft homepage, and, only if safely available, fetch existing HubSpot assets in read-only mode. Build the new editable HubSpot theme/template/modules and an optional local visual prototype. Follow the content inventory, verified-link list, AEO/SEO, accessibility, speed, design, conversion and QA rules in the brief. Do not edit any live HubSpot content; do not upload, stage, sync, watch or publish. Finish with a file tree, working local preview instructions, evidence-backed copy/claim review, QA results and an explicit `READY FOR REVIEW — NOT DEPLOYED` status. Make local files; do not only write a plan.

5. Work on Git branch `feature/gracesoft-home-v2`; review diffs before accepting changes.
6. Keep Codex in a mode that requests approval before shell commands or external tool access. Do not grant unrestricted agent permissions in a HubSpot-connected environment.

---

## 2. Live homepage audit: observed baseline

**Public source:** [GraceSoft homepage](https://www.gracesoft.com/), inspected 23 October 2026. This is a public-site review, NOT access to the private HubSpot account or confirmation of internal module/template configuration.

| Current element | Observed on public homepage | What V2 should do |
|---|---|---|
| Page title | `Hospitality Property Management System \| Hotel Front Desk Software` | Create clearer product-and-audience title as a *proposed page setting*, not hardcoded across the whole theme. |
| Main H1 | `Property Management Software - GraceSoft Easy Innkeeping` | One more buyer-specific H1; use product name consistently. |
| Hero | Broad PMS introduction; Request Demo and account activation | Short benefit-led hero with primary Request Demo and secondary Explore Features or View Pricing. Keep existing destinations. |
| Definitions | “What is GraceSoft…” and “What does Hospitality PMS do?” | Retain concise direct-answer content in crawlable HTML. |
| Benefits | Reservations, front desk, direct booking, guest communications, cloud access | Group into fewer scannable outcome-focused cards. |
| AI assistant | Large section on voice/chat, availability, booking, upsells | Keep as a clearly distinguished product capability, subject to factual validation. |
| Feature listing | PMS, booking engine, channel manager, housekeeping, payment processing, POS | Short overview with descriptive links to detailed existing pages. |
| Unified inbox / CRM | Separate lengthy sections | Combine into purposeful guest-communication overview with product links. |
| Property types | Hotels, B&Bs, resorts, vacation rentals, condos, campground/RV, multi-property | Distinct property-type navigation cards; don't omit supported segments. |
| Awards and OTA logos | Images and broad trust claims | Show only verified awards and supported integrations with permission and source evidence. |
| Product screenshots | Multiple tabs (calendar, dashboard, guests, reservations, reports, housekeeping, channel manager, POS) | Improve screenshot gallery, alt text and accessible tab keyboard behavior; reuse real screenshots if rights confirmed. |
| Testimonials | Three named customer quotes, including Stagecoach Trails Guest Ranch | Preserve only verified, permissioned quotes, exact attribution and context. No invented stats or endorsements. |
| Blog content | Latest article cards | Optionally retain 2–3 relevant recent articles; avoid an oversized blog section. |
| FAQ | Lengthy Q&A covering software, cloud, property types, direct booking and integrations | Use 5–7 customer-intent questions; answer directly, accurately, without internal notes. |
| Footer | Contact details, many product/resource links | Preserve existing navigation and approved legal/contact details; avoid touching global live footer in this phase. |

**Notable issues in public content (for remediation in V2 draft):**

- Inconsistent spelling/capitalization: `Easy Innkeeping`, `Easy InnKeeping`, and typos such as `Easy Innkepping` / `Easy Innkleeping` in current content. **Brand approval needed** for final preferred spelling; use `GraceSoft Easy InnKeeping` provisionally throughout V2.
- An FAQ answer contains an internal editorial instruction about linking a client who has used the software for 25+ years, plus a note implying competitors do not have the AI capability. **Neither belongs in public copy.** Do not repeat or invent proof.
- Claims such as “25+ years”, “Top 3”, awards, Capterra historical ranking, “all leading booking platforms”, “24/7 customer support”, platform/channel coverage and included/no-extra-fee features require a current source, scope and authorization before using as claims of fact in V2.
- Multiple long, overlapping blocks make the value proposition harder to scan. Compress without losing key product coverage and link to deeper pages.
- On-page buttons and navigation repeatedly use generic “Get Started”; favor descriptive action text.
- No measured Core Web Vitals baseline has been established by this document; **do not assert that the existing site is slow or that the new one is faster without measurements**.

**Source review requirement:** At the start of implementation, fetch the live page again and record the retrieval date. If any facts, links or sections differ from this snapshot, log them and prefer the *newer verified live observation* while preserving this original brief for traceability.

---

## 3. Deliverables Codex MUST create locally

The code is the deliverable; do not stop after mockups or planning.

```text
gracesoft-home-v2/
  AGENTS.md                            # This brief; auto-loaded by Codex when in workspace root
  README.md                            # Safe setup, build, local preview, no production commands
  docs/
    baseline-inventory.md              # Live sections, URLs, screenshots/observations, audit date
    content-map.md                     # Old section -> V2 module -> evidence -> destination
    claims-review.md                   # Verified / source-needed / exclude claims
    seo-aeo-checklist.md               # Checks + results, not fabricated scores
    accessibility-checklist.md         # Manual and automated findings
    visual-review.md                   # Desktop/tablet/mobile notes and known differences
    release-request.md                 # Pending human approval only
  theme/
    theme.json                         # HubSpot valid theme config, follow current docs/scaffold
    fields.json                        # Global design tokens/fields only where appropriate
    css/
      base.css
      components.css
      homepage.css
    js/
      homepage.js                       # Small progressive enhancement only, if required
    templates/
      layouts/base.html                 # Only if safely included in isolated new theme
      gracesoft-home-v2.html            # HubSpot page template with editable dnd_area
    modules/
      gs-home-hero.module/
      gs-home-trust.module/
      gs-home-benefits.module/
      gs-home-feature-grid.module/
      gs-home-product-preview.module/
      gs-home-property-types.module/
      gs-home-testimonials.module/
      gs-home-faq.module/
      gs-home-final-cta.module/
  preview/                             # Optional static/HTML visual approximation
    index.html                         # Must say NOT a real HubSpot HubL render
  tests/
    ...                                 # Relevant lint/accessibility/metadata/schema checks
```

Every `.module/` folder should use HubSpot's supported `meta.json`, `fields.json`, `module.html`, and CSS/JS assets as needed. **Adjust this proposed tree to an actual HubSpot CLI theme scaffold and document differences.** Do not assume folder names alone make assets valid.

If no authenticated HubSpot account or private theme files are available, still produce a well-structured **standalone V2 HubSpot-theme source draft** and a local browser-preview approximation, clearly labeling any code that requires final portal verification.

**Do not:** create a React/Next.js site as the *only* output. This project requires HubSpot-compatible HubL/templates/modules so content remains editable through HubSpot afterward.

---

## 4. Recommended new homepage information architecture

**Business audience:** independent hotels, inns, B&Bs, boutique properties and applicable resorts/vacation rentals. Buyer roles include property owners, general managers, front-desk staff and operators of small multi-property portfolios.

**Primary user question:** “Can this property management system simplify bookings, front-desk operations, payments, channels and guest communication for my kind of property?”

**Primary conversion:** Request a Demo. **Secondary conversion:** View Pricing (or Free Trial if the user-approved commercial process prefers it). Keep Login and existing customer actions accessible but visually subordinate.

| V2 order | Section / module | Job and content | Main action |
|---|---|---|---|
| 1 | Navigation/header | Clean, accessible menus; logo, Products/Solutions, Property Types, Pricing, Resources; mobile menu | Request Demo |
| 2 | Hero | Distinct audience + product + direct benefit; actual product UI screenshot; two CTAs | Request Demo / Explore Features |
| 3 | Trust strip | Customer and integration evidence only if verified; no invented review stars, awards, client counts | View Customer Stories |
| 4 | “What is Easy InnKeeping?” | 50–90-word, text-first answer to buyer intent; identify GraceSoft as vendor, software as product | Learn About PMS |
| 5 | Core benefits | Reservations, front desk, direct booking, channel distribution, payments, guest communication | Explore Features |
| 6 | Product preview | Real calendar/dashboard/screenshots with captions; not a decorative carousel | Request Demo |
| 7 | Connected capabilities | PMS, booking engine, channel manager, inbox/CRM, POS, AI; descriptive links | Explore each solution |
| 8 | Who it's for | Independent hotels, B&Bs/inns, resorts, vacation rentals, campgrounds/RV, multi-property | Explore solution pages |
| 9 | Customer evidence | Two or three real testimonials or linked case studies; exact source + attribution | Read Customer Stories |
| 10 | Integrations & onboarding/support | Evidence-backed OTA/payment connectivity; support statements subject to proof | Explore Integrations / Contact |
| 11 | FAQs | 5–7 direct buyer answers about features, users, channels, demos, cloud access, integrations/pricing | Request Demo |
| 12 | Final CTA | One compelling next step with privacy-respecting form/CTA | Request Demo |
| 13 | Footer | Approved contacts, corporate info, accessibility/legal/privacy/navigation | Contact GraceSoft |

**Do not try to preserve the current homepage's exact length.** Preserve relevant factual coverage, the existing business offerings, working links and actual customer evidence, but remove redundant or low-value content. Do not remove a product category silently: retain discoverability through section cards or existing deeper pages.

---

## 5. Proposed copy starter (draft, not approved publication copy)

These are *starting candidates*, not established company facts. Codex should put them into editable module default fields and mark any statements requiring internal confirmation.

**Product naming:** `GraceSoft Easy InnKeeping` (provisional standard; confirm with brand owner).

**SEO title candidate:** `Hotel Property Management Software | GraceSoft Easy InnKeeping`

**Meta description candidate:** `Manage reservations, front desk operations, online bookings, payments and guest communication with GraceSoft Easy InnKeeping. Explore the software or request a demo.`

**Hero eyebrow:** `GRACESOFT EASY INNKEEPING`

**H1 candidate:** `Property Management Software for Independent Hotels, Inns & B&Bs`

**Hero lead:** `Bring reservations, front desk tasks, direct bookings and guest communication into one connected hospitality platform. See how Easy InnKeeping fits the way your property operates.`

**Primary CTA:** `Request a Demo` → `https://www.gracesoft.com/livedemo`

**Secondary CTA:** `View Pricing` → `https://www.gracesoft.com/pricing`

**Direct-answer heading:** `What is GraceSoft Easy InnKeeping?`

**Direct-answer paragraph:** `GraceSoft Easy InnKeeping is hospitality property management software designed to help lodging operators manage reservations, front desk workflows, room availability, guest communication and related day-to-day tasks. Its connected product offering also covers online bookings, channel distribution and other operational needs. Available features and integrations should be confirmed for each property's plan and configuration.`

**Six feature teasers** (verify link targets, wording and product availability):

1. `Reservations & Front Desk` — `See room availability, manage reservations and coordinate arrivals from one workspace.`
2. `Direct Booking Engine` — `Offer guests a way to book through your own website.`
3. `Channel Manager` — `Manage availability and distribution across supported booking channels.`
4. `Payments & Billing` — `Support guest payments and billing through supported integrations.`
5. `Guest Communication & CRM` — `Keep guest details and important communications easier to manage.`
6. `POS & AI Options` — `Explore additional tools for on-property sales and guest interactions.`

**Suggested FAQ questions** (answers require source checks and may be edited by marketing):

- What is hotel property management software?
- Which kinds of properties use GraceSoft Easy InnKeeping?
- Can I accept direct reservations through my property website?
- Does Easy InnKeeping connect to booking channels?
- Can I manage reservations and guest communications in one place?
- Is the software cloud-based?
- How can I see a demo and understand pricing?

**Copy style:** specific, straightforward, friendly and professional. Explain acronym on first use (`property management system (PMS)`, `online travel agency (OTA)`). Avoid robotic “AI optimized” wording, keyword stuffing, unqualified superlatives, “#1”, “best”, “guaranteed bookings”, unverifiable ROI numbers, or generic feature paragraphs repeated across sections.

---

## 6. Verified existing internal destinations (do not invent links)

Use the correct actual links below and recheck HTTP status/redirects before final release. This table contains *publicly observed* website routes; it does **not** authorize changing those pages.

| Context | Current destination |
|---|---|
| Homepage canonical | `https://www.gracesoft.com/` |
| Demo | `https://www.gracesoft.com/livedemo` |
| Pricing | `https://www.gracesoft.com/pricing` |
| Free trial | `https://www.gracesoft.com/freetrial` (use clean URL, not tracking parameters copied from navigation) |
| Hotel management software | `https://www.gracesoft.com/hotel-management-software` |
| Bed & breakfast software | `https://www.gracesoft.com/bed-breakfast-reservation-software` |
| Vacation rental management | `https://www.gracesoft.com/vacation-rental-management-software` |
| Online booking engine | `https://www.gracesoft.com/online-booking-engine` |
| Channel manager | `https://www.gracesoft.com/channel-manager` |
| Testimonials | `https://www.gracesoft.com/testimonials` |
| Case study | `https://www.gracesoft.com/case-study` |

Keep other relevant property, POS, CRM, AI, support, privacy and legal destinations only after confirming them in the latest public navigation. Use descriptive anchor text (e.g. `Explore hotel booking engine`) and never use nonfunctional `href="#"` as a stand-in for a required journey. For unfinished links, show a documented development-only placeholder rather than a broken live-looking button.

---

## 7. Technical SEO and AI visibility (AEO/GEO) standards

**Priority: grounded discoverability, NOT tricks for AI models.** Google states that its AI search features use regular indexing and SEO foundations; there is no special schema, `llms.txt`, AI text file or markup required to get featured. Eligibility/appearance cannot be guaranteed.

### 7.1 Crawlable, semantic content

- Important product names, headings, value proposition, FAQs and links MUST be present in rendered HTML without requiring user interaction or API-only client rendering. HubL server-rendered markup is preferred.
- Exactly one meaningful `<h1>` for the homepage. Use ordered `<h2>` / `<h3>` hierarchy without heading-level jumps for decoration. Use semantic `header`, `nav`, `main`, `section`, `footer`, lists and buttons/anchors correctly.
- The main product is GraceSoft **Easy InnKeeping**, not the company itself. Identify vendor and product clearly and consistently.
- Make every key product and property-type page reachable by real HTML anchors, with human-useful labels.
- Use meaningful alt text for informational images; use empty alt attributes for purely decorative images.
- No key selling proposition only inside video, embedded iframe, CSS background images or screenshot text.
- Do not add hidden keyword blocks, AI-only copy, fabricated citations or unnatural Q&A spam.

### 7.2 Metadata, indexing and canonical

- Metadata belongs to the page's appropriate HubSpot page settings or dynamically controlled page-specific fields. Don't duplicate `<title>` or canonical tags in global base templates if HubSpot emits them.
- Propose one unique descriptive `<title>` and meta description; length is an editorial guide, **not** a Google ranking requirement.
- The *intended production* canonical is `https://www.gracesoft.com/`. **Never accidentally point a test/preview page's public canonical to a production URL and assume this makes staging safe.** Protect staging with access restriction/noindex as appropriate, after approval for staging.
- Check `robots`, `X-Robots-Tag`, canonical and sitemap behavior as part of deployment QA. Do not change production robots rules in local-only phase.
- `og:title`, `og:description`, social image, Twitter/X cards if supported, and proper HTML document language. Use actual approved images with correct dimensions.
- Avoid duplicate/conflicting titles, canonicals and JSON-LD injected by legacy HubSpot theme code, plugins or page settings.

### 7.3 Content and entity authority

- Define plainly: who GraceSoft is, what Easy InnKeeping is, which problems it solves, who benefits, how it works at a high level, which integrations are supported, and where to learn more.
- Answers should be near the relevant heading, written primarily for humans; link to deeper product pages for detail.
- Add genuine first-party proof: original, permissioned client quotes, actual platform screenshots, published help materials, approved product demonstrations, evidence-backed customer stories and documented integrations.
- Create a **claim register** in `docs/claims-review.md`: claim, exact on-page text, live source URL, internal verification required, source date, approval status, planned handling.
- If an integration/feature is available only for some plans, locations or configurations, qualify it. Do not promise “all features included” without pricing/legal verification.
- Exclude fabricated awards, comparisons, numerical impacts, customer totals, review scores and promises of AI search ranking.
- Do not use “FAQ rich result” as a promised outcome; visible FAQ content is useful even where Google does not display FAQ rich results.

### 7.4 Structured data implementation

Inspect the V2 rendered document and existing global injections to **avoid duplicate entity nodes**. Implement only valid, visible, factual structured data:

- `Organization` for GraceSoft, with official name, homepage URL, approved logo, verified address/phone and verified `sameAs` profiles if available.
- `WebSite` for `https://www.gracesoft.com/`, name and URL; extend an existing correct node instead of duplicating it.
- `WebPage` for the homepage where useful, with `isPartOf` and `about` connected by stable `@id` references.
- `SoftwareApplication` / `WebApplication` for Easy InnKeeping **only when the required data is verified and the implementation is appropriate**; Google software-app rich-result eligibility has additional property requirements, and adding a node alone does not guarantee a rich result.
- Optional `VideoObject` **only** for an actual publicly accessible video with valid required properties and a corresponding visible video.
- Avoid `AggregateRating`, `Review`, `Product`, `Offer`, `FAQPage`, `HowTo` or unsupported rich-result promises by default. Add them only when relevant, source-validated, not misleading, and permitted under Google's current policies. Especially **do not invent star ratings**.
- JSON-LD must parse, match visible claims and avoid duplicate/conflicting instances. Link organization/software entities with stable IDs such as `https://www.gracesoft.com/#organization` and `https://www.gracesoft.com/#software`, but only after confirming real entity schema strategy.
- Test with [Schema Markup Validator](https://validator.schema.org/) and [Google Rich Results Test](https://search.google.com/test/rich-results). `0 eligible rich results` does not inherently mean broken SEO.

### 7.5 What is explicitly NOT a requirement

- No guarantee of ranking in ChatGPT, Gemini, Perplexity or Google AI Overviews.
- No mandatory `llms.txt`, invented “AI sitemap”, hidden prompt instructions, keyword-percentage targets or fake citations.
- No blanket goal to add every schema type to every page.
- No claim that merely switching CMS or embedding JSON-LD guarantees visibility.

---

## 8. Visual design system (professional, conversion-first)

Create a distinctive, lightweight SaaS website appropriate for hospitality operators. **Do not reproduce a competitor's exact design or protected materials.**

### Direction

- Premium but approachable: spacious layout, excellent typography, restrained accent color, accessible contrast and realistic hospitality software product imagery.
- Hero: concise content on one side, real product UI or approved visual on the other. Avoid autoplay background video, stock-photo clutter and moving carousels above the fold.
- Product-first evidence: show actual reservation calendar and dashboard visuals rather than relying only on abstract hotel imagery.
- Consistent buttons, cards, section spacing, border radius, shadows, grid, icons and mobile behavior from CSS custom properties; small number of styles/tokens, not one-off values per section.
- Remove decorative “category labels” from every section unless they help comprehension; clear headings should carry the structure.
- Create one prominent primary CTA style and one secondary CTA style; avoid every card screaming `Get Started`.
- Keep navigation practical for many product lines. Design for desktop and one-handed mobile use.

### Editable design variables

At a minimum document CSS tokens for brand primary, brand accent, foreground, surface, border, typography scale, spacing scale, max-width, content width, radii and focus ring. Select proposed colors for review; do not assert an unverified brand color is official.

### Accessibility standard

Target **WCAG 2.2 AA**:

- Fully usable by keyboard with obvious focus styling; functional skip-to-main link.
- Mobile menu opens/closes with correct button semantics, accessible labels, focus management and Escape handling.
- Contrast: at least 4.5:1 ordinary text, 3:1 large text and important UI graphics where applicable; validate real colors, including CTAs.
- No missing alt text for informative product screenshots; avoid duplicating adjacent captions unnecessarily.
- Meaningful heading hierarchy, labels, landmark navigation, inline error feedback and accessible form behavior.
- Tabs must support appropriate `tablist/tab/tabpanel` semantics and arrow-key navigation if implemented as tabs; simpler non-tab gallery is acceptable and preferable if it meets the goal.
- Avoid `div` used as a button, autoplay media, motion without reduced-motion preference and hover-only essential interactions.
- Check zoom at 200%/400%, 320 CSS-pixel width, portrait and landscape, and high-contrast/motion preferences.

---

## 9. Page-speed and Core Web Vitals standard

**Field targets (75th percentile, measured separately mobile/desktop):**

| Metric | Good threshold | Measurement note |
|---|---|---|
| LCP | ≤ 2.5 s | Field CWV; prioritize real hero image/heading rendering |
| INP | ≤ 200 ms | **Field interaction metric**; Lighthouse cannot directly measure INP; use field data and lab TBT proxy |
| CLS | ≤ 0.1 | Reserve image/video dimensions and prevent dynamic content jumps |

Additional engineering targets for review (not Google ranking thresholds): aim for a Lighthouse mobile Performance score >= 90 when representative staging/lab measurements are available, no critical accessibility or SEO failures, and no unnecessary JS blocking the homepage. Do not claim success until tested; network and third-party embeds can affect scores.

Implementation:

- Serve properly sized modern images (`srcset`/`sizes` where supported), realistic assets, width/height/aspect-ratio; preload only genuinely critical hero image/fonts. **Do not lazy-load the LCP/hero image.**
- `loading="lazy"` for below-the-fold images; minimize decorative media payload.
- System/local approved font stack or efficiently hosted font with `font-display: swap`.
- No heavy page builders, unused UI libraries or giant client-side bundles merely for visual decoration.
- Progressive enhancement: primary visible content and links usable without JavaScript.
- Limit third-party scripts; preserve *necessary* HubSpot forms, tracking and cookie consent based on account policy. Document their performance cost; do not remove tracking unilaterally.
- Responsive layout tested at 360/390/768/1024/1440 widths; avoid horizontal overflow.
- Baseline current live URL with PageSpeed Insights when able; benchmark a HubSpot-rendered approved staging version later. A static mock is **not** comparable to HubSpot production.

---

## 10. Conversion and analytics requirements

- Primary conversion pathway: persistent but non-intrusive `Request a Demo` → existing `https://www.gracesoft.com/livedemo`.
- Secondary: `View Pricing` or approved `Free Trial` journey. Do not create a new commercial offer.
- No dummy request-demo button, fake bookings, raw email collection or unapproved external scheduling service.
- Preserve existing HubSpot attribution and analytics once staging is authorized; during **local-only** work, do not submit leads or fire production analytics.
- Optional event specification (document only; do not fire until approved): `home_demo_click`, `home_pricing_click`, `home_feature_click`, `home_testimonial_click`, `home_property_type_click` with parameters `section`, `destination`, `variant`.
- Clear text around value proposition and demo expectations; include actual approved testimonials rather than made-up success metrics.
- Document a lightweight A/B test hypothesis for later; do not run experiments live.

---

## 11. HubSpot architecture and manual-editing standards

**Core architectural requirement:** marketing staff MUST be able to open the eventual HubSpot page and edit content using the native visual editor **after deployment** without modifying code.

1. Create a **new isolated HubSpot theme** named conceptually `gracesoft-home-v2` — do NOT modify shared live theme files.
2. Implement a HubSpot **page template** with an appropriately labeled `{% dnd_area %}` region (and valid `dnd_section/dnd_column/dnd_row/dnd_module` composition per current docs).
3. Create **custom editable modules** for hero, benefits, screenshots, features, property types, testimonials, FAQ and CTAs. Text, headings, link URLs, image, image alt, card lists and FAQ answers should be editor fields.
4. Use global theme settings for stable design tokens; avoid hardcoded marketing copy in `base.html`, shared CSS or locked partials.
5. Keep technical SEO implementation centralized, but **do not override HubSpot page title/meta/canonical controls or duplicate global schema**.
6. Keep dynamic content safe: HTML escape plain text fields, treat rich text fields according to HubSpot's documented rendering rules, validate URLs and never interpolate untrusted content into inline JS or JSON without correct escaping.
7. Use meaningful defaults so a new page opens with the complete V2 section layout, but editor values must remain editable at the page level.
8. Handle testimonials, logos and integration names as **editable, source-validated data**; no hardcoding unsupported claims.
9. Keep actual global navigation/footer unchanged in existing portal until a later separate scope; an isolated local preview may create V2 prototypes, but do not push shared partials.
10. Before any future release, manually test editing one hero heading, one card, one image, one CTA URL and one FAQ in an isolated **approved** test page. Verify changes persist after code-only updates that do not alter module field identifiers.

**Reference HubL structure (illustrative, verify against the CLI scaffold and account before use):**

```html
<!--
  templateType: page
  isAvailableForNewContent: true
  label: GraceSoft Homepage V2 — Draft Only
-->
{% extends "./layouts/base.html" %}

{% block body %}
<main id="main-content" class="gs-home-v2">
  {% dnd_area "gs_homepage_v2", label="GraceSoft Homepage Content" %}
    {% dnd_section %}
      {% dnd_column %}
        {% dnd_row %}
          {% dnd_module path="../modules/gs-home-hero.module" %}
          {% end_dnd_module %}
        {% end_dnd_row %}
      {% end_dnd_column %}
    {% end_dnd_section %}
    {# Add other editable modules/sections here following verified docs #}
  {% end_dnd_area %}
</main>
{% endblock body %}
```

The exact `extends` path, block name, module paths, CSS attachment and fields must match the generated theme scaffold and currently supported HubL semantics. A local static HTML preview **cannot** prove HubL has compiled successfully; that requires a HubSpot render after later approval.

---

## 12. VS Code + HubSpot CLI setup (read-only development phase)

**Prerequisites:** VS Code, Git, currently supported Node.js LTS and HubSpot CLI; a HubSpot account login with permission to read CMS assets, if private source inspection is permitted.

```bash
# Installation is local development tooling, not a website deployment
npm install -g @hubspot/cli
hs --version
hs --help

# If HubSpot account authorization is approved for read-only inspection:
hs account auth

# Show available CMS commands and verify version-specific options
hs cms --help
hs cms list --help
hs cms fetch --help
hs cms lint --help

# Configure Developer MCP only if authorized and configured to prevent writes
hs mcp setup
```

**Read-only discovery:**

```bash
# Do not guess or hardcode remote paths; first list assets
hs cms list

# Example syntax only; fill in a discovered actual remote theme path
# and confirm the CLI version's syntax/help before executing.
hs cms fetch <EXISTING_REMOTE_THEME_PATH> ./reference-only-existing-theme
```

Never use the original production theme as the target of local code generation. Create the V2 theme source under `./theme` in a separate Git repository/branch and keep any `./reference-only-existing-theme` folder untouched.

**No deployment command is authorized in this phase.** In particular, do not run `hs cms upload`, `hs cms watch`, web page write APIs, or write-capable MCP actions. Put them in a future release request document only after you know the exact account and remote path.

If authorization, network access or private HubSpot code is missing, **do not block the task**. Use the public homepage plus official HubSpot CMS theme conventions to create the complete local implementation; log inaccessible details as `PORTAL_VERIFICATION_REQUIRED`.

---

## 13. Implementation tasks for Codex (execute in order, locally)

### Task A — baseline capture

- Inspect the current public homepage and navigation; save URL, retrieval date, title, H1, headings, relevant content, CTA destinations, current sections and observed page issues in `docs/baseline-inventory.md`.
- If screenshot access exists, take desktop/mobile reference screenshots using a local browser automation tool without logging in. If unavailable, document the limitation (do not fabricate screenshots).
- Collect an asset list: logos, product screenshots, testimonial photos, icons and illustrations. Verify licensing and URLs before reusing; keep placeholders local if access unavailable.
- Do not edit any current HubSpot asset.

### Task B — content and claim plan

- Create old-to-new mapping for every substantial homepage feature/section.
- Draft heading, short body and CTA text for each V2 section; use the proposed copy only as a starting point.
- Record claim verification status per claim. Put any unverified public claim into `REQUIRES_APPROVAL`, not silently presented as fact.
- Preserve relevant deep links and support for property types.

### Task C — HubSpot implementation

- Scaffold the theme structure according to the current HubSpot CLI/theme documentation, then create template and modules in **local files only**.
- Create editable field definitions and helpful labels/descriptions. No single locked monolithic HTML content block.
- Implement CSS tokens, responsive layout, accessible interactive components, progressive enhancement, product screenshot modules and defensible JSON-LD logic.
- Include a local static preview only as a design approximation if HubL cannot be compiled offline. Keep actual HubL code as the release artifact.

### Task D — QA and validation

- Run locally available format/lint/build/unit/HTML/CSS checks. Prefer existing project tooling rather than installing a large new stack.
- Validate syntactically generated JSON-LD and check consistency against visible copy. If schema validators need the deployed URL, leave that check pending.
- Verify every internal and external link target without sending form submissions. Avoid following links requiring sign-in.
- Check keyboard behaviors and responsiveness; produce evidence/screenshots if available.
- Run local Lighthouse on the static approximation only if helpful, **labeling it as a mock metric, not a HubSpot staging metric**.
- List known issues, blocked tests and important differences between public homepage and new V2.

### Task E — handoff and stop

- Create `README.md` with how to inspect files, render the optional preview and what cannot be validated until portal staging is approved.
- Create `docs/release-request.md` with the proposed remote new-theme path, intended test page plan, copy/claim approval tasks, staging QA tasks, rollback approach and confirmation that **NO remote changes occurred**.
- STOP. Do not upload/publish.

---

## 14. Acceptance checklist (all pass or documented exception)

### Scope / protection
- [ ] No existing HubSpot page, theme, global assets, CRM data, or settings changed.
- [ ] No uploads, watch/sync, remote page creation, staging or publish actions performed.
- [ ] Git local diff contains only new V2 workspace files.
- [ ] No secrets or private tokens committed.

### Content / AI search
- [ ] Actual product, company, audience and key use cases are named clearly.
- [ ] One H1, logical H2/H3 hierarchy and an informative direct-answer section.
- [ ] Unique draft title/meta description prepared for eventual page settings.
- [ ] Internal links lead to verified existing relevant pages.
- [ ] No invented awards, metrics, customer quotations, unsupported comparisons, fake integrations or hidden AEO content.
- [ ] Editorial notes and inconsistent product names removed from proposed page content (without editing live page).
- [ ] Claim register and sources included.
- [ ] Structured data is parsable, accurate and nonduplicative **as far as locally testable**.

### Design / accessibility / functionality
- [ ] Complete local HubSpot template/modules created, not only a mockup.
- [ ] Editable fields exist for all routine content updates.
- [ ] Responsive layout for major widths; no content clipped or horizontal overflow.
- [ ] Keyboard, focus, labels, contrast and media alt handling reviewed.
- [ ] **Per-page rendered visibility:** verify every text element (headings, body copy, links, labels, buttons and disclaimers) is visibly rendered, readable at normal zoom, unclipped and unobscured on desktop and mobile; verify actual foreground/background contrast meets WCAG 2.2 AA (4.5:1 normal text, 3:1 large text). Check responsive/inherited styles in the browser and record/fix failures before review.
- [ ] **Per-page responsive/mobile review:** inspect rendered layouts at 320, 360/390, 768, 1024 and 1440 CSS-pixel widths and portrait/landscape. Verify the mobile navigation works, columns stack at appropriate widths, media scales, controls remain readable/tappable, and there is no horizontal scrolling, clipping, overlap, or obscured content. Capture viewport evidence and fix failures before review.
- [ ] Navigation and demo/pricing links do not require JavaScript.
- [ ] Any interactive FAQ/tabs/carousel behavior is accessible or omitted.
- [ ] Testimonials, screenshot usage, and logos have approval checkboxes where required.

### Performance / conversion / handoff
- [ ] Images appropriately sized; hero not lazily loaded; below-fold images lazy loaded.
- [ ] No unnecessary JS libraries introduced.
- [ ] Existing demo and pricing destinations preserved.
- [ ] No production form submissions or analytics events triggered.
- [ ] Validation report distinguishes local mock tests from HubSpot-rendered tests.
- [ ] README, evidence map, release request and blocker list created.
- [ ] Final status is `READY FOR REVIEW — NOT DEPLOYED` or `DRAFT — BLOCKED`, never `PUBLISHED`.

---

## 15. Approval-only future path (DO NOT EXECUTE NOW)

When the user reviews and approves **development upload**, the engineer should separately propose:

1. Confirm HubSpot account/portal ID, new remote theme path, current deployment history and required permissions.
2. Upload new assets **only** into a distinct, non-production theme folder (never overwrite an existing path).
3. Create an isolated unpublished test page or approved preview workspace, with appropriate access/noindex controls.
4. Verify the entire HubL page renders successfully with real HubSpot assets and global includes, and that marketing can manually edit hero/cards/FAQ/CTA.
5. Run preview QA: WCAG, link correctness, forms (using controlled test mode), schema validation, Lighthouse mobile/desktop, analytics/consent checks and no mixed canonical/robots signals.
6. Obtain separate written approval specifying the **live homepage URL** and launch window before any production replacement.
7. Before launch capture live HTML, screenshots, HubSpot page revision / content export, template dependencies and a rollback plan. After launch verify canonical, metadata, schema, forms, redirects if any, analytics, Search Console, performance and error monitoring.

The user's current instruction supplies **neither Gate B nor Gate C approval**.

---

## 16. Codex required final answer format

When the local work is complete, Codex must respond with:

1. `STATUS: READY FOR REVIEW — NOT DEPLOYED` (or accurate blocked status).
2. `FILES CREATED:` concise workspace file tree.
3. `HOMEPAGE DIFFERENCES:` meaningful before/after section changes.
4. `AI/SEO/AEO:` checklist and what was verified versus not yet verifiable.
5. `HUBSPOT EDITABILITY:` field/module coverage and tests not yet possible offline.
6. `CLAIMS NEEDING APPROVAL:` exact unsupported claims, logos, data, photos and proposed replacements.
7. `QA:` actual executed commands/tests and results; any omitted tests clearly marked.
8. `NEXT AUTHORIZATION REQUIRED:` precise **new remote theme / test page** scope; absolutely no implied approval or production action.

---

## 17. Authoritative reference links (read and follow current docs)

**HubSpot developer tooling**

- HubSpot CLI overview: https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/reference
- HubSpot Developer MCP setup: https://developers.hubspot.com/docs/developer-tooling/local-development/developer-mcp/setup
- HubSpot CLI v8 changes (`hs cms` commands): https://developers.hubspot.com/changelog/introducing-hubspot-cli-v8.0.0
- HubSpot CMS building blocks: https://developers.hubspot.com/cmshub
- HubSpot custom module configuration: https://developers.hubspot.com/docs/cms/building-blocks/modules/configuration
- HubSpot drag-and-drop development example: https://developers.hubspot.com/blog/bookmarking-blog-content-with-memberships-and-custom-objects

**Search and structured data**

- Google SEO fundamentals and AI search features: https://developers.google.com/search/docs/appearance/ai-features
- Google generative AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google structured data intro/guidelines: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Software app structured data (review property requirements): https://developers.google.com/search/docs/appearance/structured-data/software-app
- Site name / `WebSite` markup: https://developers.google.com/search/docs/appearance/site-names

**UX, accessibility and performance**

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Core Web Vitals: https://web.dev/articles/vitals/
- Lighthouse: https://developer.chrome.com/docs/lighthouse/overview
- Schema validator: https://validator.schema.org/

**GraceSoft source / conversion**

- Current homepage: https://www.gracesoft.com/
- Existing demo: https://www.gracesoft.com/livedemo
- Pricing: https://www.gracesoft.com/pricing
- Product details: https://www.gracesoft.com/hotel-management-software
- Customer testimonials: https://www.gracesoft.com/testimonials

---

## 18. Final rule

> **Implement the new GraceSoft homepage V2 as reviewable LOCAL FILES, with authentic content, editable HubSpot modules, clean design, sound SEO/AEO engineering and complete QA documentation. Do not change the live page, existing theme or HubSpot account. Do not upload or publish anything unless and until the user gives explicit, scoped approval.**

For new pages, reuse the completed Atelier homepage design in working/theme/Atelier Theme/. Consult docs/theme-selection.md for the current design handoff and retain all production approval gates.

## Ongoing Atelier page work
Follow README.md, "From local template to review draft", for each new page. The completed homepage is the reusable design baseline. Deliver the local template/content and, when requested, a verified separate unpublished page and review link. The owner performs final publication. Preserve the existing remote-write approval boundaries.

For existing pages, follow the README section “Sync a page after someone edits it in HubSpot”. Pull published edits by page ID into a separate snapshot, reconcile against the local working copy and baseline, and check the latest draft before any authorized draft write. Preserve team edits and escalate same-field conflicts to the owner.
