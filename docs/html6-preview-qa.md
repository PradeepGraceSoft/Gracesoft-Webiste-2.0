# HTML6 design review and browser QA

4 November 2026 · Local static homepage · GraceSoft Easy InnKeeping

Open [HTML6](../working/preview/HTML6.html) directly. Keep the preview in its workspace so the shared fonts and product assets resolve. The illustration, stylesheet and interaction script live in the adjacent html6 folder.

## Design comparison

The [six-way desktop comparison](../working/preview/html6/comparison.jpg) uses the same 1440 × 900 Chromium viewport. Hero heights exclude navigation. The assessments below are design judgments.

| Version | What works | What informed HTML6 | Hero height |
|---|---|---|---:|
| Atelier | Compact entry, recognizable product, warm editorial type | Dense calendar detail competes with the message at first glance. Keep the operator-facing content. | 537 px |
| HTML2 | Dark centered stage with a clear focal point | The opening takes more than one desktop viewport before the next chapter appears. | 1154 px |
| HTML3 | Clear corporate headline and quiet transitions | The gradient-framed calendar repeats the earlier composition. | 749 px |
| HTML4 | Distinct bundled fonts and consistent button hierarchy | The original headline breaks across many short lines. Give text more room. | 820 px |
| HTML5 | Strongest previous product exploration. Two real screens, explicit choices and direct chapter links. | The picker is useful. Give users a hospitality-specific way into those same workflows. | 725 px |
| HTML6 | An original architectural illustration is both the visual identity and a navigable map. The product screens remain one action away. | The demo and trial remain beside the original message. The chapter bar and next section appear in the first desktop viewport. | 640 px |

HTML6 uses one dedicated stylesheet. It shares image and font assets with earlier previews, while owning its layout and interactions. Walkthrough features now pair their original description, destination and screenshot inside the same selected panel. Timed progression runs only while visible and pauses for pointer or keyboard interaction. Reduced-motion visitors start with progression paused. The pause control is explicit.

## Browser evidence

| Check | Result |
|---|---|
| Responsive layout | Passed in Chromium at 1920 × 1080, 1440 × 900, 1024 × 768, 820 × 1180, 390 × 844, 320 × 690 and 844 × 390. No document-level horizontal overflow at those sizes. |
| Visual inspection | Reviewed [desktop](../working/preview/html6/review-1440.jpg), [mobile](../working/preview/html6/review-390.jpg) and the [section overview](../working/preview/html6/review-sections.jpg). |
| Content preservation | Compared original Atelier headings, main paragraphs, quotes, captions, image sources and distinct link destinations. All retained. All eleven main sections remain. |
| Navigation and product | Verified the three hero views, image decoding, full-size destination, hotel chapter jump, FAQ disclosure, mobile menu and Escape. Exercised all fourteen feature tabs and keyboard Home selection. Checked all local fragment targets. |
| Accessibility basics | One H1. Checked buttons and links for names. Tested keyboard interaction, reduced-motion behavior and no-JavaScript access to navigation and all fourteen walkthrough panels. Full assistive-technology and WCAG audits remain open. |
| Local loading | In a preliminary 390 × 844 cold loopback run, mobile layout shift was 0.206. Initializing mobile menu layout earlier, reserving exhibit controls, and preloading fonts on HTTP brought CLS to 0 in three subsequent runs. LCP was 116–136 ms, no network throttling, reduced motion enabled. These measurements describe this local machine and preview. |
| Scope | Static design sample. Browser coverage is Chromium only. Production form delivery, external destination availability, HubSpot rendering, real-device Safari and field performance remain unverified. |
| Source material | Twelve of fourteen walkthrough panels inherit labeled illustration placeholders. Two panels use real screenshot assets. Existing commercial claims, metrics, endorsements and awards retain their original wording and require owner verification before release. |

For repeatable checks, run the [browser checks](../working/preview/html6/check.cjs) or [local measurement](../working/preview/html6/measure.cjs) with Node and Playwright Chromium available. Set PLAYWRIGHT_MODULE and PLAYWRIGHT_BROWSERS_PATH if the installation is outside normal Node resolution.

**Ready for local design review.**
