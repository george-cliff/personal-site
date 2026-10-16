// Content for /cv/. Each section is only shown once it has content;
// until then the page just says "Coming soon…".

export interface CvEntry {
  /** e.g. a role or qualification. */
  title: string;
  /** e.g. an employer or institution. */
  organisation: string;
  /** Free text, e.g. '2024 – present'. */
  dates: string;
  details?: string[];
}

export const cv = {
  /** A PDF in public/, e.g. '/files/george-cliff-cv.pdf'. Leave undefined until one exists. */
  pdf: undefined as string | undefined,
  /** A short personal profile. */
  profile: undefined as string | undefined,
  education: [] as CvEntry[],
  experience: [] as CvEntry[],
  /** Grouped skills, e.g. { group: 'Languages', items: ['C', 'Python'] }. */
  skills: [] as { group: string; items: string[] }[],
  /** `href` is optional, e.g. a project page on this site. */
  projects: [] as { title: string; href?: string; description: string }[],
  additional: [] as string[],
};
