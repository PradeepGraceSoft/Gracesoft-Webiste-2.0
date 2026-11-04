---
name: page-qa-release
description: Validate a new GraceSoft HubSpot CMS page and deliver its editable source, preview instructions, and page-specific QA evidence.
---

# GraceSoft page acceptance

Identify the page, intended route, audience, primary CTA, template and modules. Use the three companion skills named in AGENTS.md for acceptance criteria. Apply existing checks only after confirming they exercise this page and current source.

## Local checks

1. Inspect the HubSpot page template annotation, layout, drag-and-drop area and module composition. Resolve local references, parse theme and module JSON, and check field types, defaults and HubL usage. Confirm editors have fields for page copy, media, alt text and CTAs. Check unfamiliar constructs against HubSpot developer documentation. Label any static preview as an approximation.
2. Verify the answer to the main buyer question, product identity, claim evidence and crawlable internal links. Inspect rendered headings, descriptive anchors, link status and redirects. Review the proposed page title, description, canonical, language and social metadata separately from tags actually observed. Parse any JSON-LD, check for duplicate entities and match claims to visible content. Report AI discovery foundations tested without assigning an AI visibility score.
3. Open the preview in a browser. Exercise the primary journey without submitting production forms. Check desktop, tablet, mobile, 320 CSS pixels, zoom, keyboard focus and interactive controls. Run an accessibility scan and manually check the applicable criteria in the accessibility skill. Record representative screenshots or reproducible findings.
4. Run a representative lab performance check and record the tested URL, device profile, tool and conditions. Inspect hero loading, image dimensions and layout shifts. Report field Core Web Vitals only when field data exists.

## HubSpot and release checks

Separate local evidence from checks requiring an approved isolated HubSpot draft. Record the latter as pending portal validation until the exact target and actions are authorized. On that target, test representative editor changes and inspect final rendered markup, metadata, structured data, canonical and indexing protection. Reserve production indexing, sitemap and field measurements for the applicable release stage. Follow all AGENTS.md approval gates.

## Handoff

Save a page-specific report under docs with the source revision or file paths, date, preview target and one row per check:

| Check | Expected | Observed | Result | Command, evidence or blocker |
|---|---|---|---|---|

Use pass, fail, unavailable, blocked or not applicable. Explain every deferred or inapplicable check. Fix in-scope local failures, rerun affected checks and record the result. Deliver source paths, local preview instructions, the report and outstanding checks. Use **READY FOR REVIEW — NOT DEPLOYED** once required local checks pass. If required local evidence is missing, report incomplete local QA.
