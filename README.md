# georgecliff.com

Source for [georgecliff.com](https://georgecliff.com): a static [Astro](https://astro.build/) site, deployed to GitHub Pages by GitHub Actions on every push to `main`. Agent guidance lives in [AGENTS.md](AGENTS.md).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Structure

```text
src/
  content/writing/     All articles, one Markdown (or MDX) file each
  content.config.ts    Article schema
  data/
    writing.ts         Writing categories (labels, descriptions, icons)
    projects.ts        Projects
    site.ts            Name, bio and social/contact links
    cv.ts              CV sections
  components/layout/
    navigation.ts      Sidebar and launcher links
    MainNav.astro      Sidebar navigation and flyouts
  components/ui/
    ColourSignature.astro  Four-colour signature
  layouts/BaseLayout.astro  Shared page shell and theme script
  styles/colours.css   Colour palette and semantic tokens
  lib/writing.ts       getPosts() and postUrl()
  pages/
    writing/[...category].astro       /writing/ and /writing/<category>/
    writing/[category]/[slug].astro   /writing/<category>/<slug>/
    projects/index.astro              /projects/
    projects/[id].astro               /projects/<id>/
    about.astro, cv.astro, contact.astro
```

## Design

**Tactile · Expressive · Editorial**: a considered architectural studio on the outside, a curious, expressive workshop inside. The interface is warm and neutral (Paper / Graphite); four accent families mark the sections (Violet: Home, Teal: Projects, Copper: Writing, Rose: About) and are used selectively, because colour should indicate context and interaction, not decorate everything.

- Colours live in `src/styles/colours.css`. Components use its semantic `--color-*` roles, never raw palette shades or hard-coded values.
- Each page's section comes from the navigation (`sectionOf()` in `navigation.ts`); the current nav item and content links take that section's accent, and each nav item shows its own section's colour on hover. Pages outside the navigation get Violet. Header social badges have their own colours and turn Rose on hover.
- Status colours (`--status-{success,warning,info,error}-*`) are for feedback messages only, never decoration or section identity.
- The site is dark by default; the header toggle switches to light and the choice is remembered.
- Below 768px the navigation is a top bar and the four-colour signature sits in the footer; from 768px up it's a sidebar, with a `georgecliff.com` label and the signature at its foot.

See [docs/design-system.md](docs/design-system.md) for the colour system, layouts, section identity and four-colour signature.

## Writing

Devlog, Notes and Hobbies are categories of one `writing` collection.

| Category  | For                                                       | Listing             |
| :-------- | :-------------------------------------------------------- | :------------------ |
| `devlog`  | Development journals, technical experiments and progress  | `/writing/devlog/`  |
| `notes`   | Discoveries, tutorials, observations and general writing  | `/writing/notes/`   |
| `hobbies` | Personal interests and other non-technical topics         | `/writing/hobbies/` |

`/writing/` lists every published article, newest first. The homepage's "From the notebook" shows the five most recent.

### Publishing an article

1. Create `src/content/writing/<slug>.md`. The file name becomes the URL: `/writing/<category>/<slug>/`. Keep files directly in this folder, not in subfolders.
2. Add the frontmatter:

   ```yaml
   ---
   title: Building Atlas
   description: One sentence for listings and search results.
   pubDate: 2026-10-20
   category: devlog
   ---
   ```

3. Choose `devlog`, `notes` or `hobbies` as the category.
4. Write the article below the frontmatter.
5. Commit and push to `main`.
6. GitHub Actions builds and deploys the site. The article appears in its category, in `/writing/` and on the homepage.

Articles can also be written in [Pages CMS](https://pagescms.org/) (configured in `.pages.yml`), which commits to `main` for you. Keep `.pages.yml` in step with the schema in `src/content.config.ts`.

### Frontmatter

| Field         | Required | Notes                                                                    |
| :------------ | :------- | :----------------------------------------------------------------------- |
| `title`       | Yes      |                                                                          |
| `description` | Yes      | Shown in listings and used as the meta description                       |
| `pubDate`     | Yes      | `YYYY-MM-DD`                                                             |
| `category`    | Yes      | `devlog`, `notes` or `hobbies`                                           |
| `updatedDate` | No       | Shown as "Updated …" on the article                                      |
| `tags`        | No       | e.g. `[astro, accessibility]`                                            |
| `project`     | No       | The `id` of a project in `src/data/projects.ts`                          |
| `image`       | No       | A path in `public/`, e.g. `/images/atlas.jpg`; needs `imageAlt` with it |
| `imageAlt`    | No       | Describes `image`; use `""` if it's purely decorative                    |
| `draft`       | No       | `true` to hide the article; defaults to `false`                          |

The build fails with a clear message if a required field is missing, the category is unknown or the project id doesn't exist.

### Drafts

Articles with `draft: true` appear, labelled "Draft", under `npm run dev` only. They are left out of every listing and get no page in the production build, so they're safe to commit.

### Projects and writing

Projects are listed in `src/data/projects.ts`. Each one gets its own page at `/projects/<id>/`, and is listed on `/projects/`. An article with `project: <id>` shows "Part of <project>" linking to that page, and the project page lists all its articles under "Related writing". To feature one, set `featured: true` and pick an `icon` (a Tabler name, e.g. `'tabler:cpu'`): it's then listed in the Projects navigation flyout with that icon, and the first two featured projects appear on the homepage. The build stops if a featured project has no icon. Projects with `draft: true`, like the two examples, only appear under `npm run dev`.

### Adding a category

Add it to `categories` in `src/data/writing.ts` (and to the list of keys in its type, just above). The schema, its listing page and its navigation link follow automatically. Add the new value to the `category` options in `.pages.yml` too.

Each category's optional `description` is shown under its heading and used as its meta description. Until one is set, the page shows "Description coming soon…".

## Navigation

The sidebar and the Ctrl/Cmd+K launcher both read `links` in `src/components/layout/navigation.ts`:

```ts
{
  label: 'About',
  href: '/about/',
  icon: 'tabler:user',
  children: [
    { label: 'CV', href: '/cv/', icon: 'tabler:file-cv' },
  ],
}
```

- **Add or change a link or icon:** edit its entry. Icons are [Tabler](https://tabler.io/icons) names prefixed with `tabler:`.
- **Add a flyout:** give a top-level link `children`. Only one level is supported.
- **Icon only on mobile:** set `mobileIconOnly: true` (used for Home, so the mobile bar fits on most phones). Screen readers still read the label.
- **Featured projects and writing categories** are generated from `src/data/projects.ts` and `src/data/writing.ts`, so they don't need editing here.

On desktop, a flyout opens beside its link on hover, or with the arrow button next to it (keyboard and touch). On mobile, the arrow button opens it below the navigation bar. Parent links always go to their own page, Escape closes an open flyout, and without JavaScript the hover still works and every page is reachable from its parent page.

## About, CV and Contact

All three currently say "Coming soon…".

- `/about/`: written directly in `src/pages/about.astro`. Replace "Coming soon…" with the page's sections.
- `/cv/`: fill in `src/data/cv.ts`. Each section appears once it has content, and "Coming soon…" disappears. To offer a PDF, put it in `public/` (e.g. `public/files/george-cliff-cv.pdf`) and set `pdf: '/files/george-cliff-cv.pdf'`.
- `/contact/`: written in `src/pages/contact.astro`. The contact links are `socialLinks` in `src/data/site.ts` (shown in the header), and can be listed here with the `SocialLink` component.

## Old URLs

`/devlog/`, `/devlog/hello-world/` and `/misc/` redirect to their new `/writing/` addresses (see `redirects` in `astro.config.mjs`).
