// Site identity, shared by the layout components.
export const site = {
  name: 'George Cliff',
  initials: 'GC',
  bio: 'Computer Science, with an interest in computer architecture, embedded systems and low-level software.',
  /** SHA-256 hash of the Gravatar email address. Initials are shown until it's set. */
  gravatarHash: undefined as string | undefined,
};

export interface SocialLink {
  label: string;
  href: string;
  /** Tabler icon name, e.g. 'tabler:brand-github'. */
  icon: string;
}

// Only list links that are ready to publish, e.g.
// { label: 'RSS', href: '/rss.xml', icon: 'tabler:rss' },
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/george-cliff', icon: 'tabler:brand-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/george-cliff/', icon: 'tabler:brand-linkedin' },
  { label: 'Email', href: 'mailto:gcliff@fastmail.com', icon: 'tabler:mail' },
];
