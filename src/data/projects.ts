import type { ImageMetadata } from 'astro';

interface ProjectDetails {
  /** Short, stable name, e.g. 'atlas'. Sets the page URL (/projects/atlas/) and is
   *  what a writing article's `project` frontmatter refers to. */
  id: string;
  title: string;
  description: string;
  /** Screenshot or diagram imported from src/assets/. */
  image?: { src: ImageMetadata; alt: string };
  /** Short labels such as status or technologies. */
  meta?: string[];
  /** Shown by `astro dev` only, never in the production build. */
  draft?: boolean;
}

// A featured project is listed in the Projects navigation flyout, with its icon, and
// the first two are shown on the homepage under "On the workbench". So it needs an icon.
export type Project = ProjectDetails &
  (
    | { featured?: false }
    | {
        featured: true;
        /** Tabler icon name for the navigation flyout, e.g. 'tabler:cpu'. */
        icon: string;
      }
  );

// All projects, in display order. Each gets its own page and is listed on /projects/.
// Set `featured: true` and an `icon` to also list it in the navigation flyout and on the homepage.
export const allProjects: Project[] = [
  {
    id: 'example-featured',
    title: 'Example featured project',
    description: 'A draft example with featured: true, so it also appears on the homepage.',
    meta: ['Draft', 'Featured'],
    featured: true,
    icon: 'tabler:cpu',
    draft: true,
  },
  {
    id: 'example-unfeatured',
    title: 'Example unfeatured project',
    description: 'A draft example without featured, so it only appears on /projects/.',
    meta: ['Draft'],
    draft: true,
  },
];

// The type check only runs in the editor, so stop the build too if an icon is missing.
for (const project of allProjects) {
  if (project.featured && !project.icon) {
    throw new Error(`Project "${project.id}" is featured, so it needs an icon, e.g. icon: 'tabler:cpu'`);
  }
}

// The projects to show: drafts are left out of the production build.
export const projects = allProjects.filter((project) => import.meta.env.DEV || !project.draft);

export function projectUrl(project: Project) {
  return `/projects/${project.id}/`;
}

export const featuredProjects = projects.filter(
  (project): project is Extract<Project, { featured: true }> => project.featured === true,
);
