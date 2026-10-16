# Design system

How georgecliff.com looks and why. Status markers: **Implemented** (in the code now), **Approved** (agreed, not built yet), **Open** (still to decide).

## Identity

**Tactile · Expressive · Editorial.** A considered architectural studio on the outside, with the personality of a curious, expressive workshop inside.

- A disciplined, consistent global layout.
- Warm, tactile surfaces and restrained structural design.
- Strong editorial typography and visual hierarchy.
- Expressive colour used selectively and purposefully.
- More freedom to experiment inside individual projects and articles.

The site is both a technical portfolio and a personal publication; neither should dominate the other.

**Colour should indicate context, not decorate everything.**

## Layout

**Implemented.** One shared layout, `src/layouts/BaseLayout.astro`, wraps every page: navigation, header, main content and footer. It has two navigation layouts, switching at `48rem` (768px), and one header change at `76rem` (1216px).

| Width            | Navigation                                                                                                     | Header                                                                                 |
| :--------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| Below `48rem`    | Sticky bar across the top, scrolling sideways if needed. Home is icon-only. Flyouts drop down below the bar.    | Name and bio, then icon-only social links and the launcher and theme buttons below.    |
| `48rem`–`76rem`  | Full-height sticky sidebar, `13rem` wide, with icons and labels. Flyouts open to its right.                     | As above, with labelled social links. Scrolls with the page.                           |
| `76rem` and up   | Same sidebar.                                                                                                  | One row: identity, social links, actions. Sticks to the top.                           |

Tablet is the sidebar layout at a narrower page width. There is no collapsed (icon-only) tablet sidebar; earlier briefs and the homepage wireframe assumed one.

## Colour system

**Implemented.** Colour system v1.0 (the v0.2 kit's values, adopted unchanged), five families × 11 shades (50–950), 55 OKLCH tokens. The authoritative values are in [`src/styles/colours.css`](../src/styles/colours.css), imported once by the shared layout. Change colours there, not in components.

| Family           | Responsibility                  |
| :--------------- | :------------------------------ |
| Paper / Graphite | Neutral structural foundation   |
| Violet           | Home and global identity        |
| Teal / Cyan      | Projects                        |
| Copper / Amber   | Writing                         |
| Rose / Magenta   | About                           |

The interface is predominantly Paper / Graphite. Violet is **not** a universal primary colour; no accent is. Paper / Graphite is one merged warm-neutral family, so there are five families, not six. The colours were inspired by [Dracula](https://draculatheme.com/) and [Flexoki](https://stephango.com/flexoki).

### Token layers

1. **Raw palette** — `--paper-graphite-50` … `--rose-950`. Values only; components never use them directly.
2. **Semantic UI roles** — `--color-*`, mapped to palette shades per mode. Components use only these.
3. **Contextual section tokens** — *Approved, not yet implemented.* See [Section identity](#section-identity).

Semantic roles (implemented):

| Role                                        | Use                                        | Light               | Dark                |
| :------------------------------------------ | :----------------------------------------- | :------------------ | :------------------ |
| `--color-background`                        | Page                                       | paper-graphite-50   | paper-graphite-950  |
| `--color-surface`                           | Cards, nav flyouts                         | paper-graphite-50   | paper-graphite-900  |
| `--color-surface-muted`                     | Recessed areas                             | paper-graphite-100  | paper-graphite-800  |
| `--color-sidebar`                           | Sidebar and mobile nav bar                 | paper-graphite-100  | paper-graphite-900  |
| `--color-text`                              | Body text                                  | paper-graphite-950  | paper-graphite-50   |
| `--color-text-muted`                        | Secondary text, metadata                   | paper-graphite-700  | paper-graphite-300  |
| `--color-border`                            | Dividers, outlines                         | paper-graphite-300  | paper-graphite-700  |
| `--color-link`                              | Links                                      | paper-graphite-900  | paper-graphite-100  |
| `--color-interactive` / `--color-on-interactive` | Filled controls and their text; selection | 950 / 50       | 50 / 950            |
| `--color-focus`                             | Focus outlines                             | paper-graphite-950  | paper-graphite-50   |
| `--color-accent-{violet,teal,copper,rose}`  | Accent text and small details              | 700, 800, 700, 800  | 300 (all)           |
| `--color-signature-{violet,teal,copper,rose}` | Four-colour signature only               | 500 (all)           | 400 (all)           |

The accent roles are dark (light mode) or light (dark mode) enough for text: 5.06:1 or more against the page and sidebar backgrounds. The signature uses brighter mid shades because it is decorative.

### Light and dark mode

**Implemented.** The site follows `prefers-color-scheme`. `<html data-theme="light">` or `"dark"` overrides it. The header's dark mode toggle (and the launcher switch) stores the choice in `localStorage` as `darkMode`; an inline script in the layout's `<head>` applies it before first paint and keeps `data-theme` in step with the toggle. Code blocks (Expressive Code) follow `data-theme` too.

### Contrast

Checked against WCAG AA for every text pairing the site uses. Lowest values: muted text 5.36:1 (light) and 7.86:1 (dark, on cards); accents 5.06:1 (copper on the light sidebar). Borders are 1.4–2.9:1: fine for dividers, so never use a border alone to show state.

## Section identity

**Approved, not yet implemented.** Each section has an accent that marks where you are:

| Section                                | Accent |
| :------------------------------------- | :----- |
| Home                                   | Violet |
| Projects and project pages             | Teal   |
| Writing and articles                   | Copper |
| About, CV and Contact                  | Rose   |
| Colophon                               | Violet |

Anything without a clear section defaults to **Violet**, the global identity colour.

Rules:

- The active sidebar / mobile navigation item reflects the current section.
- Section headings stay primarily neutral.
- Small indicators, eyebrow labels and selected contextual links use the section accent.
- Standard buttons stay Graphite; featured buttons may use the section accent selectively.
- Homepage previews may use the accent of the section they come from.

Today the active navigation item is neutral (border, page-colour fill and bold text) and no component uses an accent. Building this needs contextual section tokens in `colours.css`, with light and dark mappings, and a way for each page to declare its section.

## Four-colour signature

**Implemented.** Four equal bars, always in this order: **Violet → Teal → Copper → Rose**. A decorative identity element, hidden from assistive technology; not a control. It does not change with the current page.

- Component: [`src/components/ui/ColourSignature.astro`](../src/components/ui/ColourSignature.astro). 9px bars, 4px gaps, 2px corners.
- `48rem` and up (tablet and desktop): bottom of the sidebar, spanning its width.
- Below `48rem` (mobile): bottom of the site footer, centred, up to `20rem` wide. Not sticky.
- Only one instance is visible at a time; `BaseLayout.astro` controls which.

## Open

- Font roles: Iosevka, Iosevka Aile and Iosevka Etoile are available; which does what is undecided.
- Section identity implementation (above).
- Browser theme colour: an optional `<meta name="theme-color">` would tint mobile browser UI, such as the address bar, to match the page in each mode. Not decided.
