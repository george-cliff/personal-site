# Agent guidance — georgecliff.com

This file contains standing instructions for coding agents working on this repository. Keep it short and stable. Project status, task lists, design exploration, and implementation details belong elsewhere.

## Project

georgecliff.com is a personal website built with Astro. It combines technical projects and writing. Its deployment model is a statically generated site; preserve that architecture unless a change is explicitly agreed.

Treat the **current repository** as the source of truth. Check the relevant source files, configuration, package scripts, and existing components before making assumptions. Do not rely on outdated plans or nonexistent documentation paths.

## Engineering principles

- **KISS:** Prefer the simplest solution that meets the requirement. Do not add abstractions, dependencies, or infrastructure without a concrete need.
- **Astro-first:** Prefer native `.astro` components, layouts, content collections, and build-time rendering.
- **Static by default:** Deliver HTML and CSS without client-side JavaScript where possible. Preserve progressive enhancement.
- **Islands only when needed:** Hydrate a UI-framework component only when its interactivity warrants it. For small interactions, prefer native browser features or focused vanilla JavaScript.
- **Reuse before creating:** Follow existing patterns and extend components where it reduces meaningful duplication. Avoid speculative component systems.
- **Accessible and responsive:** Use semantic HTML, keyboard-operable controls, visible focus states, appropriate labels, and reduced-motion support.
- **Colour through tokens:** Use the semantic `--color-*` roles from `src/styles/colours.css`; never hard-code colours or use raw palette shades in components. Keep the interface neutral; for section colour use `--color-section` (current page) or `--color-section-<name>`, sparingly, as `docs/design-system.md` describes. Use `--status-*` colours only for real feedback, always with text.
- **Keep the site lightweight:** Prefer existing packages and browser capabilities. Optimise assets where relevant; avoid premature optimisation.

## Making changes

1. Inspect the relevant code and understand the existing behaviour before editing.
2. Make the smallest coherent change that satisfies the request. Avoid unrelated refactoring or redesign.
3. Preserve established routes, content, styling, and working features unless the task calls for changing them.
4. Follow the project's existing formatting, naming, TypeScript, CSS, and content conventions. Use content collections rather than duplicating authored content in components.
5. If a proposed change would alter the site's architecture, introduce a major dependency, or break compatibility, explain the trade-off before proceeding.
6. Respect uncommitted work. Never discard changes, stage files, or create commits unless explicitly asked.

## Before finishing

- Run the relevant checks available in the repository (at minimum, the production build for changes affecting the site), where feasible.
- Check the affected pages and responsive behaviour when UI is changed.
- Report what changed, what was verified, and any known limitations. Do not claim checks passed unless they were run.

Keep this file focused on **how agents should work**. Do not append temporary tasks, progress updates, feature backlogs, or session-specific instructions.
