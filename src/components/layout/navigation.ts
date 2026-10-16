import { featuredProjects, projectUrl } from '../../data/projects';
import { categories, categoryIds, categoryUrl } from '../../data/writing';

/** Site sections, each with its own accent colour (see src/styles/colours.css). */
export type Section = 'home' | 'projects' | 'writing' | 'about';

export interface NavLink {
  label: string;
  href: string;
  /** Tabler icon name, e.g. 'tabler:home'. */
  icon: string;
  /** On mobile, show only the icon to save space. The label is still read by screen readers. */
  mobileIconOnly?: boolean;
  /** Links shown in a flyout beside this one. One level only. */
  children?: NavLink[];
  /** Top-level links only: the section this link and its pages belong to. */
  section?: Section;
}

// Main navigation, shared by the sidebar and the launcher.
// Featured project and writing category links are generated from their own data.
export const links: NavLink[] = [
  { label: 'Home', href: '/', icon: 'tabler:home', mobileIconOnly: true, section: 'home' },
  {
    label: 'Projects',
    href: '/projects/',
    icon: 'tabler:code',
    section: 'projects',
    children: [
      { label: 'All projects', href: '/projects/', icon: 'tabler:layout-grid' },
      ...featuredProjects.map((project) => ({
        label: project.title,
        href: projectUrl(project),
        icon: project.icon,
      })),
    ],
  },
  {
    label: 'Writing',
    href: '/writing/',
    icon: 'tabler:notebook',
    section: 'writing',
    children: [
      { label: 'All writing', href: '/writing/', icon: 'tabler:books' },
      ...categoryIds.map((id) => ({
        label: categories[id].label,
        href: categoryUrl(id),
        icon: categories[id].icon,
      })),
    ],
  },
  {
    label: 'About',
    href: '/about/',
    icon: 'tabler:user',
    section: 'about',
    children: [
      { label: 'About me', href: '/about/', icon: 'tabler:id' },
      { label: 'CV', href: '/cv/', icon: 'tabler:file-cv' },
      { label: 'Contact', href: '/contact/', icon: 'tabler:mail' },
    ],
  },
];

// The section a page belongs to: the top-level link whose own or child links
// it falls under, so /projects/<id>/ is Projects and /cv/ is About. Pages
// outside the navigation, such as the Colophon, default to Home.
export function sectionOf(pathname: string): Section {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const link = links.find(
    ({ href, children = [] }) =>
      href !== '/' && [href, ...children.map((child) => child.href)].some((h) => path.startsWith(h)),
  );
  return link?.section ?? 'home';
}

// Every page once, for the launcher's search. A child that repeats its parent's link is skipped.
export const pages = links
  .flatMap((link) => [link, ...(link.children ?? [])])
  .filter((link, i, all) => all.findIndex(({ href }) => href === link.href) === i);

export const launcherId = 'site-launcher';
