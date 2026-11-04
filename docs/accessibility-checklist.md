# Accessibility checklist

Target: WCAG 2.2 AA. This is a source review, not a completed screen-reader or browser audit.

- [x] Skip link, header/nav/main/footer landmarks, one H1 and ordered section headings in local preview.
- [x] Native anchors and buttons; no key journey depends on JavaScript.
- [x] Mobile menu uses a button with `aria-expanded` and `aria-controls`; closes on link activation, Escape and desktop resize.
- [x] FAQ uses native `details`/`summary`, no custom tabs/carousel.
- [x] Focus-visible rule and reduced-motion handling present.
- [x] Informative hero visual has a textual accessible name and a visible adjacent note identifying it as conceptual.
- [ ] Verify contrast ratios with an automated color checker in final rendered CSS; source colors were selected as proposed tokens, not certified official brand colors.
- [ ] **Per-page visibility check:** inspect every heading, paragraph, link, label, button and disclaimer in the rendered page at desktop and mobile sizes. Confirm text is present, readable at normal zoom, not clipped/overlapped/obscured, and has sufficient contrast against its actual background (WCAG 2.2 AA: 4.5:1 normal text, 3:1 large text). Check inherited and responsive styles; do not rely on source CSS review alone. Record and fix every failure before review.
- [ ] **Per-page responsive/mobile check:** inspect the rendered page at 320, 360/390, 768, 1024 and 1440 CSS-pixel widths, plus portrait and landscape. Verify navigation switches to a usable mobile menu at the intended breakpoint; content columns stack without cramped text; images/media scale within the viewport; controls remain readable and tappable; no horizontal scrolling, clipping, overlap, or obscured content occurs. Record viewport evidence and fix failures before review.
- [ ] Manual keyboard-only and screen-reader review.
- [ ] 200%/400% zoom, 320 CSS-pixel viewport, landscape and high-contrast checks.
- [ ] Visual browser inspection across 360/390/768/1024/1440 widths.
- [ ] HubSpot editor form-field labels/help and saved content behavior verification pending test-page authorization.

- [ ] **CTA pair check:** for every hero with two actions, verify shared visual treatment, equal control height, centered labels, consistent baseline, usable spacing, visible focus, and no wrapping/overflow at 320px through desktop widths. Confirm primary and secondary actions remain distinguishable by wording and destination even when they share a color.
