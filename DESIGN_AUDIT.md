# Portfolio design audit

## Scope

Reviewed the home page, navigation, responsive menu, project gallery, project case-study pages, document viewers, shared styling, motion, assets, and responsive rules at desktop and mobile widths. The primary visitor goal is to understand Abdul's profile quickly, assess the quality of his analytics work, and reach a resume, case study, GitHub profile, or contact route without friction.

## What should be preserved

- The café setting is memorable and gives the portfolio a real point of view.
- The warm brown, cream, and amber palette fits the imagery and feels cohesive.
- Real dashboard screenshots make the project work credible.
- Case studies already contain strong problem, process, insight, and outcome structure.
- Content hierarchy is semantic, links are generally descriptive, and reduced-motion support already exists.

## Prioritized findings

### Critical

- **Typography is doing too much thematic work.** Pixelify Sans is used for long headings, navigation, buttons, and detailed case-study titles. It reduces scan speed and makes the work feel game-themed before it feels analytical.
- **The project grid does not express importance.** All four projects use nearly the same card pattern. The two complete case studies need a clearly stronger, editorial presentation than dashboard previews.
- **Navigation is overloaded.** Eight section links plus the resume compete in a narrow desktop strip and make the header feel like a control panel rather than a calm orientation aid.

### High

- **Background detail competes with content after the hero.** The fixed café interior remains visually active under every section, reducing contrast and making the long page feel dense.
- **Decorative metaphors are over-applied.** Chalkboards, tickets, shelves, frames, pins, hard offset shadows, and asymmetric corners all appear together. The theme is distinctive, but the quantity weakens consistency.
- **Primary and secondary actions are not differentiated enough.** The hero presents four similarly weighted controls; project actions also rely on the same visual treatment everywhere.
- **Mobile project cards are too long.** Full outcome paragraphs push the useful action below the fold and make comparison difficult.

### Medium

- Section markers and headings compete for attention and often repeat the section's purpose.
- Muted copy uses several close-but-inconsistent cream and brown values.
- Some image alt text is empty even when the certificate image carries useful context.
- Modal behavior supports Escape but does not deliberately manage initial focus or lock background scrolling.
- A blocking loading screen adds delay without communicating meaningful progress.

### Low

- Several legacy components and old visual tokens remain unused.
- Decorative hover movement is inconsistent in distance, shadow, and rotation.
- The full-page fixed-background composition can produce unreliable stitched screenshots; viewport-level views are stable.

## Recommended direction

Keep the café as the memorable setting, but treat it as atmosphere rather than the entire component language. Use DM Sans for all reading and hierarchy, reserve Pixelify Sans for small labels and the brand signature, simplify surfaces to one soft-panel system, use amber only for priority and interaction, and let the dashboard imagery carry the project storytelling. The result should feel like a polished analytics product portfolio with a distinctive editorial skin—not a themed template.

## Implementation plan

1. Rebalance the hero around a clear value proposition and two priority actions.
2. Reduce the desktop navigation to the most useful destinations while retaining every section on the page.
3. Establish a restrained typography, color, radius, shadow, and spacing system.
4. Turn the first two projects into large case-study rows and the remaining work into compact supporting cards.
5. Quiet the page background and decorative treatments after the first viewport.
6. Restyle the case-study and document pages with the same system.
7. Improve mobile density, menu behavior, image treatment, focus, and reduced-motion behavior.

## Evidence limits

Visual inspection can identify contrast, hierarchy, density, reflow, and apparent focus affordances. It cannot prove screen-reader output, keyboard order across every browser, color-contrast ratios under all display conditions, or real-device performance. Those require automated and manual accessibility checks after implementation.
