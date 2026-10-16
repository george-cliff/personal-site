import type { ImageMetadata } from 'astro';

export interface Project {
  title: string;
  description: string;
  /** The project's own page. */
  href: string;
  /** Screenshot or diagram imported from src/assets/. */
  image?: { src: ImageMetadata; alt: string };
  /** Short labels such as status or technologies. */
  meta?: string[];
}

// Shown on the homepage under "On the workbench". Add a project once its page exists.
export const featuredProjects: Project[] = [];
