import { featuredProjects, projectUrl } from '../../data/projects';
import { categories, categoryIds, categoryUrl } from '../../data/writing';

export interface NavLink {
  label: string;
  href: string;
  /** Tabler icon name, e.g. 'tabler:home'. */
  icon: string;
  /** On mobile, show only the icon to save space. The label is still read by screen readers. */
  mobileIconOnly?: boolean;
  /** Links shown in a flyout beside this one. One level only. */
  children?: NavLink[];
}

// Main navigation, shared by the sidebar and the launcher.
// Featured project and writing category links are generated from their own data.
export const links: NavLink[] = [
  { label: 'Home', href: '/', icon: 'tabler:home', mobileIconOnly: true },
  {
    label: 'Projects',
    href: '/projects/',
    icon: 'tabler:code',
    children: [
      ...featuredProjects.map((project) => ({
        label: project.title,
        href: projectUrl(project),
        icon: project.icon,
      })),
      { label: 'All projects', href: '/projects/', icon: 'tabler:layout-grid' },
    ],
  },
  {
    label: 'Writing',
    href: '/writing/',
    icon: 'tabler:notebook',
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
    children: [
      { label: 'About me', href: '/about/', icon: 'tabler:id' },
      { label: 'CV', href: '/cv/', icon: 'tabler:file-cv' },
      { label: 'Contact', href: '/contact/', icon: 'tabler:mail' },
    ],
  },
];

// Every page once, for the launcher's search. A child that repeats its parent's link is skipped.
export const pages = links
  .flatMap((link) => [link, ...(link.children ?? [])])
  .filter((link, i, all) => all.findIndex(({ href }) => href === link.href) === i);

export const launcherId = 'site-launcher';
