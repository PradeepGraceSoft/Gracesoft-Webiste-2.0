# GraceSoft website redesign workspace

This repository is the single local workspace for the GraceSoft redesign. Local work is isolated from production. **Do not change HubSpot files or settings, including the active theme, without the owner's explicit permission naming the action and target.** Read [AGENTS.md](AGENTS.md) before making project changes.

The standing homepage objective is qualified organic/AEO visibility plus lead conversion. See `docs/homepage-visibility-and-conversion-strategy.md` for strategy and `docs/homepage-content-draft-2026-11-02.md` for the current review copy.

The standing content brief is `docs/content-strategy-playbook.md`; the latest proposed homepage copy is `docs/homepage-content-draft-2026-11-02.md`. The restored export remains read-only and its page inventory is `docs/export-page-inventory.csv`.

## Folder map

```text
reference/                  Read-only existing-site notes; the restored static export is in `Hubspot Existing Page Export/` and is read-only
source/read-only-reference/ Reserved for an explicitly authorized HubSpot source snapshot
working/
  theme/Atelier Theme/  Current local HubSpot-compatible theme source
  preview/home-v2-atelier-content.html  Current static review preview
  preview/                              Review scripts, screenshots and audit artifacts
docs/                       Design, content, SEO, accessibility and release notes
docs/portal-validation/     HubSpot account, theme and editor-validation evidence
published/                  Local release package only; never deploys by itself
archive/                    Legacy scaffolds/reports preserved for traceability
skills/                     Project-specific implementation guidance
```

## Current HubSpot boundary

- The local HubSpot CLI config lists GraceSoft portal 107648 (`easy-innkeeping`). A uniquely named warm-palette development theme was uploaded after separate explicit authorization; no page was created and no theme was activated.
- The owner restored **Act3** as the active theme and confirmed it is the baseline. Do not change this setting.
- That prior upload approval does not extend to any further upload, account, theme, page, settings, or publication changes.
- The restored `Hubspot Existing Page Export/` supersedes older notes that said the archive was absent. See `docs/export-analysis.md` for reproduced counts and limitations.

## Current local draft

Open `working/preview/home-v2-atelier-content.html` in a browser for the current local review. It is not a HubSpot HubL render. See `docs/atelier-content-review.md` for its sources and completed checks. The content-only proposal is in `docs/homepage-content-draft-2026-11-02.md`; it is not applied to the local homepage implementation.

## Safety

Do not place credentials, tokens, cookies or account exports in Git without an explicit scoped plan. Keep owner-provided exports read-only. Never publish from this repository.
