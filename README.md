# GraceSoft Atelier website workspace

## Main local theme — selected 5 November 2026

Use **Atelier Theme with the Pearl Ocean palette** for ongoing local work. Open [the main homepage preview](working/preview/home-v2-atelier-content.html). Its CMS source remains in `working/theme/Atelier Theme/`; its preview palette is `working/preview/pearl-ocean.css`.

Alternate themes and design samples are archived in [OLD Samples](OLD%20Samples/). This selection is local only and does not change the HubSpot active theme.

Build reusable templates and author page content locally. Deliver a separate unpublished HubSpot website page for owner review. The owner handles final publication.

## Working folders

| Location | Purpose |
| --- | --- |
| [Atelier theme](working/theme/Atelier%20Theme/) | Canonical HubL source. Put reusable page layouts in templates/, editable components in modules/, styles in css/, scripts in js/ and images in assets/. |
| working/pages/ | Create when authoring the first new page. Keep one folder per page slug with its page.json create payload, including page metadata and any page-specific content overrides. Keep credentials out. |
| [Local previews](working/preview/) | Rendered review artifacts and build scripts. The homepage builder renders module defaults for the homepage specifically. |
| [Design baseline](docs/theme-selection.md) and [content playbook](docs/content-strategy-playbook.md) | Design and editorial rules for new pages. |
| [Portal evidence](docs/portal-validation/) | Record portal ID, template path, draft ID, review URL and verified state. |
| docs/migration/, archive/, reference/, source/, published/ | Migration plans, historical materials, reference snapshots and local release packages. |
| Hubspot Existing Page Export/ | Read-only evidence indexed in [the export inventory](docs/export-page-inventory.csv). |

## From local template to review draft

1. **Choose the template.** Reuse a matching Atelier template across pages. When the layout is new, add a named HubL page template with editable modules and a drag-and-drop area. Keep unique page copy in the page payload or page-specific module overrides. Changes to a shared template or module can affect every page using it.
2. **Prepare the page locally.** Give it a descriptive internal name, HTML title, unique review slug, language, draft state and exact remote templatePath. A static preview HTML file is a review artifact; the CMS page API takes structured JSON. Check headings, links, keyboard access and mobile layout before remote work.
3. **Upload only new assets needed for the authorized draft.** Use account 107648 and the existing remote theme folder. Example for a newly authored template, run from the project root:

   ```powershell
   hs cms upload "working/theme/Atelier Theme/templates/product-page.html" "gracesoft-atelier-review-20261103-b73c9e/templates/product-page.html" --account=107648
   ```

   Upload new module or asset dependencies first. Obtain specific approval before overwriting an existing remote file. Selecting the target folder does not require changing the active Act3 theme.

4. **Create one draft.** Check the review log and HubSpot for an existing draft with the same slug before submitting or retrying. For a new page, the CLI request is `hs api /cms/v3/pages/site-pages --method POST --account=107648 --data <page-json>`. Supply the JSON contents as one argument. Include `"state":"DRAFT"` and a templatePath such as `gracesoft-atelier-review-20261103-b73c9e/templates/product-page.html`. Do not use the live homepage slug. The last CLI creation attempt lacked the required `content` scope. If still blocked, use an authorized credential or have the owner create a website page from the uploaded template in HubSpot and save it as a draft. Do not repeat a successful theme upload.
5. **Verify and hand off.** Read the returned page by ID, check its unpublished state, slug and template path, and open its preview. Verify page-specific copy actually rendered. Record the ID and HubSpot review link, then stop. Publishing, scheduling, domain changes and theme activation are outside this workflow.

## Sync a page after someone edits it in HubSpot

Use the HubSpot page ID, even if the title or slug changes. For an existing page, open its folder under `working/pages/`. Keep `page.json` as your local working content. Keep `published-baseline.json` as the last published snapshot you reconciled. A new, never-published page only needs a draft baseline.

1. **Read the state you need.** If Sales changed a button and published it, fetch the regular site-page endpoint. For saved but unpublished editor changes, fetch the separate draft endpoint. Neither GET changes HubSpot. In PowerShell:

   ```powershell
   $pageId = 'YOUR_PAGE_ID'
   $endpoint = "/cms/v3/pages/site-pages/$pageId"
   $published = hs api $endpoint --account=107648 --json
   if ($LASTEXITCODE -ne 0) { throw 'Published page read failed' }
   $published | Set-Content -Encoding utf8 published-latest.json

   $draft = hs api "$endpoint/draft" --account=107648 --json
   if ($LASTEXITCODE -ne 0) { throw 'Draft read failed' }
   $draft | Set-Content -Encoding utf8 draft-latest.json
   ```

2. **Compare before importing.** On first sync, inspect the published snapshot beside existing local content before establishing the baseline. On later syncs, compare three versions: last reconciled publication, latest publication, and local working content. Compare editable values and layout by module instance and field. Ignore timestamp-only differences. Preserve IDs, order, additions and deletions.
3. **Merge deliberately.** If only Sales changed the button label, import it into the local page. If you edited an FAQ too, keep both edits. If both sides changed the same label, or one removed a module the other edited, show the conflict and resolve it with the owner. When there are no remote content changes, leave local work alone. After reconciliation, save the latest published snapshot as the published baseline; keep unpublished local changes only in the working copy.
4. **Separate page content from shared code.** Page-editor overrides belong to that page. Design Manager edits to a shared template, CSS or module require a separate source comparison: fetch the remote asset with `hs cms fetch` into a separate comparison folder and diff against Git before any authorized upload. A shared asset update can affect already-published pages.
5. **Before an authorized draft update**, re-read both states. Reconcile any further publication and preserve pending editor changes in the fresh draft. If a field conflicts, stop for resolution. Send only the intended writable changes to `PATCH /cms/v3/pages/site-pages/{pageId}/draft`; build any required nested object from the fresh draft. A final comparison is not a lock: coordinate a brief editing handoff before writing. Verify by reading the draft back and opening Preview. The owner publishes. Refresh the published baseline only after a confirmed publication or published-state sync.

Keep fetched snapshots local unless explicitly approved for version control. The homepage preview builder renders theme defaults; importing a page snapshot alone does not update that preview.

## Homepage baseline

The owner completed the Atelier homepage design. The template is already uploaded at `gracesoft-atelier-review-20261103-b73c9e/templates/home-v2.html`. No new Atelier homepage draft ID was returned by the recorded attempt. See the [review handoff](docs/atelier-content-review.md). For the local homepage run `node working/preview/build-atelier-content.cjs` and open [the preview](working/preview/home-v2-atelier-content.html).

Read [AGENTS.md](AGENTS.md) for approval boundaries. Older setup and release-request snapshots are retained under archive/legacy-workspace-notes/ for traceability.
