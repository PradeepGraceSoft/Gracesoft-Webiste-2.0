---
name: gracesoft-seo-aeo
description: Apply search, answer-engine and AI discovery standards to GraceSoft website content.
---

# GraceSoft SEO and AEO standards

Use when drafting or reviewing public-facing GraceSoft website pages.

## Rules

- Write useful, factual content for lodging operators. No promise of top ranking or AI citation.
- Put product identity, audience, benefit, answers and internal links in crawlable HTML.
- Use one descriptive page title, meta description, one meaningful H1 and an ordered heading hierarchy.
- Define property management system (PMS) and online travel agency (OTA) on first use when needed.
- Link to current verified destinations with descriptive anchor text. Check status and redirects before release.
- Keep title, description, canonical, language and social metadata in page settings where HubSpot owns them. Do not duplicate global tags.
- Use structured data only for verified entities and visible content. Avoid ratings, awards, offers, FAQs or software claims without evidence and policy review.
- Maintain `docs/claims-review.md` for every proof claim: exact copy, source URL/date, verification owner and approval state.
- Never add hidden keyword blocks, fake citations, unsupported comparisons, review stars or AI-only copy.
- Treat performance, ranking, conversion and AI visibility as measured outcomes. Never invent scores.
- Do not promise a top ranking, AI Overview inclusion or citation. Google states that AI features use standard SEO foundations and add no special markup requirement.

## Review checklist

1. Identify search intent and target audience.
2. Verify product capabilities and destinations.
3. Answer the main question directly near the top of the page.
4. Check headings, links, metadata, semantic HTML and mobile usability.
5. Record unverified claims as excluded or pending evidence.

## Homepage V2 verification record

Use `docs/seo-aeo-checklist.md` as the project-specific status record. Keep results there rather than copying status checkboxes into this reusable skill. The current review records:

- One visible H1, concise headings, crawlable prose, product/vendor/audience identification, and a direct answer near its heading.
- Descriptive links to observed product routes, with some footer/property routes still awaiting status verification.
- Proposed unique title and meta description for page settings.
- No hidden AI copy, keyword blocks, fabricated citations, mandatory `llms.txt`, ratings, or FAQ schema promises.
- A conservative `Organization` / `WebSite` JSON-LD candidate at `working/theme/gracesoft-atelier-content-dev/partials/schema-candidate.html`. Inclusion remains gated on checking for duplicates in global/page markup and approving identity details; schema does not guarantee AEO visibility.
- Canonical, robots, sitemap and indexing checks are pending an approved isolated HubSpot test page. A preview must not use the production canonical.
- Rendered HubSpot markup/metadata validation is pending separate upload approval. Recheck destination HTTP statuses and redirects immediately before release; observed navigation alone is not a status test.

The public page contains broad AI, integration, award, company-age, support and testimonial claims. Qualify or omit them pending evidence as recorded in `docs/claims-review.md` (create/update this claim register as part of page review; do not treat the checklist itself as the register).

## Related project skills

- For editable HubSpot templates, modules, page fields, or HubL implementation, also read `skills/hubspot-editable/SKILL.md`.
- For page design, interaction, accessibility, or conversion review, also read `skills/accessibility-usability-conversion/SKILL.md`.
- For new GraceSoft copy, also follow `docs/content-strategy-playbook.md` and use `docs/export-page-inventory.csv` to locate read-only evidence. Keep export material read-only.

## Primary references

- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
