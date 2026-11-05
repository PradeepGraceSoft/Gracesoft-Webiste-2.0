# Atelier premium theme consistency review

Date: 5 November 2026. Local-only review of `working/preview/home-v2-atelier-content.html`. Source: `working/theme/Atelier Theme/css/premium-depth.css`, attached to the editable theme layout and the requested preview. No HubSpot changes.

The review replaced inherited botanical green controls with a consistent role-based palette: teal primary actions with navy text, navy outlined secondary actions on light surfaces, light outlined actions on dark surfaces, and dark teal text links. Active product tabs use the same teal. Hover, focus, navigation dropdown, mobile menu, footer disclosure, FAQ and property-card states now use the same palette. Distinct section backgrounds remain intact. Text entrance motion retains full opacity for continuous contrast.

| Check | Expected | Observed | Result | Evidence |
|---|---|---|---|---|
| Original page content | Preserve content and destinations | Preview body byte-identical to pre-restyle backup | Pass | `contentUnchanged` in report |
| Responsive layout | No horizontal overflow | None at 320, 390, 768, 1024 and 1440 CSS pixels | Pass | Browser viewport results |
| Text contrast | No automated contrast violations | None at all five widths | Pass | axe-core color-contrast scans |
| Expanded content | Readable FAQ answers and footer groups | No automated contrast violations after expansion | Pass | `expandedContrast` |
| Controls | Consistent normal, hover and focus colors | 12 representative control families checked; all have visible focus | Pass | `states` color values |
| Product tabs | Working selection | All 14 tabs exercised across three sections | Pass | Tab counts in report |
| Mobile navigation | Opens and closes with Escape | aria-expanded true then false | Pass | Browser interaction results |
| JavaScript | No runtime errors | Zero page errors | Pass | `errors` |
| Heading | Preserve one H1 | One at every tested width | Pass | Browser viewport results |
| Visual evidence | Desktop/mobile screenshots | Updated 1440px/390px full-page images and customer-stories detail | Pass | `working/preview/atelier-premium-*.png`, `premium-stories.png` |
| Portal rendering | Verify in HubSpot | No remote action authorized | Blocked | Separate approval required |

Reproduce: `node working/preview/audit-premium-theme.cjs`. Uses the existing Playwright installation and local axe-core dependency. Raw results: `working/preview/atelier-premium-complete-qa.json`. This checks visual consistency and applicable interactions; it is not a full WCAG certification or a performance audit.

**READY FOR REVIEW — NOT DEPLOYED.**
