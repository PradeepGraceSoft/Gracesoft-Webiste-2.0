# Purple Theme page QA

Date: 2026-11-04 (local)

Status: **READY FOR REVIEW — NOT DEPLOYED**

Scope: Independent local theme source based on Atelier Theme; no HubSpot write, upload, sync, staging, or publication performed.

| Check | Expected | Observed | Result | Evidence |
|---|---|---|---|---|
| Theme configuration and module metadata | Valid JSON and required module files | Theme/fields/module JSON parses; 17 modules include metadata, fields, and HTML | Pass | Local Node structural scan |
| HubSpot-editable source | Page template with DnD area and editable module defaults | Copied Atelier HubL template and modules retained in Purple Theme | Pass (source inspection) | `working/theme/Purple Theme/templates/home-v2.html`, `modules/` |
| Local static preview | No HubL left; balanced document/styles | Preview generated from defaults; no unrendered HubL; balanced style tags | Pass | `working/preview/build-purple-theme.cjs` |
| Responsive rendering | No horizontal overflow at mobile/tablet/desktop | 320, 390, 768, 1024, 1440 CSS px; document width equals viewport at all five | Pass | Chrome results in `purple-theme-qa.json` |
| Heading and local navigation | One H1; all fragment targets exist | One H1; zero broken fragment links at each tested width | Pass | Chrome results in `purple-theme-qa.json` |
| Mobile menu and Escape | Menu opens and Escape closes it | `aria-expanded` true after open, false after Escape | Pass | Chrome interaction record |
| Browser errors | No uncaught page errors | None observed | Pass | Chrome Playwright run |
| Unsupported metric claims | Unverified numbers not presented as proof | Outcome numbers hidden and replaced visually with neutral copy | Pass | `css/purple.css`; browser visibility check |
| 200%/400% zoom, screen reader, contrast audit | WCAG 2.2 AA review | Not fully exercised in this run | Unavailable | Requires manual accessibility review |
| Performance / field CWV | Lab and field performance evidence | No representative lab report or field data generated | Unavailable | No speed or CWV claim made |
| HubSpot portal rendering/editor | Isolated approved page and editor validation | Not performed | Blocked by local-only approval gate | Requires separate explicit authorization |
| Destination link status/redirects | Verify all live destinations before release | Not checked in this local-only implementation pass | Unavailable | Recheck before any release |

The local preview is a static approximation, not a HubSpot HubL render. Purple is a proposed theme palette, not an approved official brand palette.

