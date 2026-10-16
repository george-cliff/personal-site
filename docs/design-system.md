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

**Colour should indicate context and interaction, not decorate everything.** The underlying interface stays neutral.

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

The site uses three kinds of colour, each with its own job:

1. **Neutral** (Paper / Graphite): the structural foundation: backgrounds, text, borders, standard controls.
2. **Contextual section colours** (Violet, Teal, Copper, Rose): where you are and what you're interacting with. See [Section identity](#section-identity).
3. **Semantic status colours** (success, warning, info, error): functional feedback only. Not part of the palette's five families. See [Status colours](#status-colours).

The interface is predominantly Paper / Graphite. Violet is **not** a universal primary colour; no accent is. Paper / Graphite is one merged warm-neutral family, so there are five families, not six. The colours were inspired by [Dracula](https://draculatheme.com/) and [Flexoki](https://stephango.com/flexoki).

### Token layers

1. **Raw palette** — `--paper-graphite-50` … `--rose-950`. Values only; components never use them directly.
2. **Semantic UI roles** — `--color-*`, mapped to palette shades per mode. Components use only these.
3. **Contextual section tokens** — `--color-section-{home,projects,writing,about}` map each section to its accent role (so they follow the mode). `--color-section`, `--color-section-strong` and `--color-section-tint` follow the nearest `data-section` attribute: `<html>` for the page, or an element inside it such as a nav item or a homepage block. See [Section identity](#section-identity).
4. **Status tokens** — `--status-{success,warning,info,error}-{fg,bg,border}`. See [Status colours](#status-colours).

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
| `--color-link` / `--color-link-hover`       | Links outside page content (and hover)     | 900 / 950           | 100 / 50            |
| `--color-interactive` / `--color-on-interactive` | Filled controls and their text; selection | 950 / 50       | 50 / 950            |
| `--color-focus`                             | Focus outlines                             | paper-graphite-950  | paper-graphite-50   |
| `--color-accent-{violet,teal,copper,rose}`  | Accent text and small details              | 700, 800, 700, 800  | 300 (all)           |
| `--color-accent-*-strong`                   | Hover text                                 | 900 (all)           | 200 (all)           |
| `--color-accent-*-tint`                     | Hover / focus backgrounds                  | 100 (all)           | 900 (all)           |
| `--color-social-{github,linkedin,email}`    | Header social badges                       | text, `#0a66c2`, violet accent | text, `#70b5f9`, violet accent |
| `--color-signature-{violet,teal,copper,rose}` | Four-colour signature only               | 500 (all)           | 400 (all)           |

The accent roles are dark (light mode) or light (dark mode) enough for text: 5.06:1 or more against the page and sidebar backgrounds. On their own tint they are 4.96:1 or more, and strong text on a tint 7.89:1 or more. The signature uses brighter mid shades because it is decorative.

LinkedIn blue is the one brand exception to the palette, and the only HEX value outside the palette: LinkedIn's `#0a66c2` in light mode (5.53:1) and a lighter `#70b5f9` in dark (7.30:1). It is not a sixth family.

### Light and dark mode

**Implemented.** The site is **dark by default**: first-time visitors get dark mode whatever their system setting, and the header toggle switches to light. The theme is set through `<html data-theme="light">` or `"dark"`; without JavaScript, `colours.css` falls back to `prefers-color-scheme`. The toggle is Accessible Astro's `DarkMode` component in the header (also reachable from the launcher); it still sets its own `.darkmode` class, but colours key off `data-theme` only. It stores the choice in `localStorage` as `darkMode`; an inline script in the layout's `<head>` applies it (or dark, if nothing is saved) before first paint and keeps `data-theme` in step with the toggle. The component runs with `initialMode="dark"`. Code blocks (Expressive Code) follow `data-theme` too.

### Browser theme colour

**Implemented.** `<meta name="theme-color" content="#5E409D">` in `BaseLayout.astro` tints browser UI that supports it (e.g. the mobile address bar in Chrome and Safari) Violet, the global identity colour, in both modes. Meta tags can't read CSS variables, so this is `--violet-700` written as HEX; change both together.

### Contrast

Checked against WCAG AA for every text pairing the site uses. Lowest values: muted text 5.36:1 (light) and 7.86:1 (dark, on cards); accents 5.06:1 (copper on the light sidebar). Borders are 1.4–2.9:1: fine for dividers, so never use a border alone to show state.

## Section identity

**Implemented.** Each section has an accent that marks where you are. Colour indicates context; it doesn't decorate.

| Section                                | Accent |
| :------------------------------------- | :----- |
| Home                                   | Violet |
| Projects and project pages             | Teal   |
| Writing and articles                   | Copper |
| About, CV and Contact                  | Rose   |
| Colophon                               | Violet |

Anything without a clear section defaults to **Violet**, the global identity colour.

How it works: `sectionOf()` in `src/components/layout/navigation.ts` finds the top-level nav link a page falls under (its own `href` or a child's), so nested pages inherit their parent's section. `BaseLayout.astro` writes the result to `<html data-section>`, and `colours.css` points `--color-section` at that section's accent.

Rules:

- The active sidebar / mobile navigation item reflects the current section.
- Section headings stay primarily neutral.
- Small indicators, eyebrow labels and selected contextual links use the section accent.
- Standard buttons stay Graphite; featured buttons may use the section accent selectively.
- Homepage previews may use the accent of the section they come from.

Where accents appear today:

- **Navigation:** each top-level item, and its flyout links, carries its own section (`data-section` on the item), so it always uses its destination's colour:
  - *Current item:* border and icon in the accent, on the page colour, bold neutral text.
  - *Hover and keyboard focus:* accent border, accent-tinted background, strong-accent label and accent icon. Hovering Projects shows Teal on any page. The flyout toggle uses the same colours, and its border stays accented while the flyout is open.
  - Short colour transitions (0.15s), only when reduced motion is not requested. Unselected items at rest are neutral. The Colophon isn't in the navigation, so no item is current there.
- **Content links** (inside `<main>`): the nearest section's accent at rest, its strong variant and a 2px underline on hover and focus. So links on About, CV and Contact are Rose, on the Colophon Violet. On the homepage, the intro uses Violet, "On the workbench" Teal and "From the notebook" Copper (`data-section` on each block). The rule has zero specificity, so components that style their own links (nav, badges, card titles, writing filters, footer) keep theirs.
- **Project cards:** metadata in `--color-section-projects` (Teal), wherever the card appears.
- **Writing lists:** the category label in `--color-section-writing` (Copper), e.g. on the homepage.

Everything else (headings, body text, buttons, cards, borders, utility controls) is neutral. New accent uses should stay this small.

## Social badges

**Implemented.** The header's GitHub, LinkedIn and Email badges (`SocialLink.astro`, with `brand` set in `src/data/site.ts`) each have their own colour on text, icon and border: GitHub neutral (the text colour), LinkedIn its brand blue, Email Violet. On hover and keyboard focus all three turn Rose, with a Rose-tinted background, and return to their own colour afterwards. This is the same on every page. Shape, size, placement and the icon's Boop animation are unchanged; transitions and the animation only run when reduced motion is not requested.

## Status colours

**Implemented.** Four functional feedback colours, defined directly in OKLCH in `colours.css` (three values per status and mode, not full 11-shade scales). They are not identity colours: their hues are kept visibly apart from the section accents.

| Status    | Hue           | Means                                      | Light text | Dark text |
| :-------- | :------------ | :----------------------------------------- | :--------- | :-------- |
| `success` | Forest green  | Something worked or is confirmed           | `#2F6633`  | `#9BD69C` |
| `warning` | Golden ochre  | Caution; may need attention                | `#7C5500`  | `#E8D266` |
| `info`    | Muted blue    | Neutral, helpful information               | `#255D96`  | `#9FC8F7` |
| `error`   | Brick red     | Something failed or is invalid             | `#9D352F`  | `#F8A59B` |

HEX values are approximate, for reference; the OKLCH tokens are authoritative. Each status has:

- `--status-<name>-fg`: text and icon colour.
- `--status-<name>-bg`: subtle background.
- `--status-<name>-border`: border.

Contrast: text is 5.81:1 or more on its own background and on every page, sidebar and card background, in both modes. Borders are 3.06:1 or more against the page.

Rules:

- Use status colours **only** for meaningful feedback: notifications, validation messages, alerts, status badges and system states.
- Never use them for navigation, decoration or section identity, and never use accents for feedback.
- Editorial metadata is not feedback. A project's "In progress", or an article's "Draft" label, is not success, warning or error; style it as metadata.
- Never rely on colour alone. Every message needs text that states its meaning ("Error: …", "Saved"), and usually an icon: Tabler `tabler:circle-check` (success), `tabler:alert-triangle` (warning), `tabler:info-circle` (info), `tabler:alert-circle` (error). Mark icons `aria-hidden="true"` when the text already says it.
- Keep each status's meaning the same everywhere.

### Toasts

Accessible Astro's `ToastProvider` is mounted once, by `src/components/ui/ThemeToast.astro` in the shared layout; call `window.toast` to show one. `colours.css` points the library's `--color-{success,warning,info,error}-{bg,border,text}` variables at the status tokens, and its default toast at the neutrals.

- Bottom-right (1rem from the edges on mobile), 3 seconds, dismissible, and Escape dismisses all. Announced politely (the region is a `role="log"`), with the type read first, e.g. "success - …". Focus is never moved. The slide-in only runs when reduced motion is not requested.
- A message can have a subtitle: put it after a newline (`'Title\nSubtitle'`). The first line is styled as the title (bold, the status colour) and the rest as a smaller muted subtitle (`::first-line`, because the library sets messages as plain text). Keep titles short: if one wraps, only its first line is styled as the title.
- **Theme switching:** switching theme with the header toggle or the launcher's switch shows a success toast: "Switched to dark mode / Colours look a little more vibrant :)" or "Switched to light mode / Colours might look a little muted :(". Nothing is shown on page load or when a saved choice is restored. A quick second switch replaces the previous theme toast. While the launcher is open, the toast sits behind its backdrop until it closes; the launcher's switch shows the new state itself.

Typical use of the tokens in other components:

```css
.message[data-status='error'] {
  color: var(--status-error-fg);
  background: var(--status-error-bg);
  border: 1px solid var(--status-error-border);
}
```

## Four-colour signature

**Implemented.** Four equal bars, always in this order: **Violet → Teal → Copper → Rose**. A decorative identity element, hidden from assistive technology; not a control. It does not change with the current page.

- Component: [`src/components/ui/ColourSignature.astro`](../src/components/ui/ColourSignature.astro). 9px bars, 4px gaps, 2px corners.
- `48rem` and up (tablet and desktop): bottom of the sidebar, spanning its width, under a small `georgecliff.com` label (muted text, 13px, 8px above the bars). The label and bars form one decorative identity group, pushed to the foot of the sidebar and hidden from assistive technology, since the name is already in the header and page title.
- Below `48rem` (mobile): bottom of the site footer, centred, up to `20rem` wide, without the label. Not sticky. (Centred by choice; an earlier brief said left-aligned.)
- Only one instance is visible at a time; `BaseLayout.astro` controls which.

## Open

- Font roles: Iosevka, Iosevka Aile and Iosevka Etoile are available; which does what is undecided.
