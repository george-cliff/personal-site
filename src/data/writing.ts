// Writing categories, shared by the content schema, the /writing/ routes and the navigation.
// An article's `category` frontmatter must be one of these keys.

interface CategoryInfo {
  label: string;
  /** Shown under the category's heading and used as its meta description. */
  description?: string;
  /** Tabler icon name, used in the navigation. */
  icon: string;
}

export const categories: Record<'devlog' | 'notes' | 'hobbies', CategoryInfo> = {
  devlog: { label: 'Devlog', icon: 'tabler:terminal-2' },
  hobbies: { label: 'Hobbies', icon: 'tabler:compass' },
  notes: { label: 'Notes', icon: 'tabler:notes' },
};

export type Category = keyof typeof categories;

export const categoryIds = Object.keys(categories) as [Category, ...Category[]];

export function categoryUrl(category: Category) {
  return `/writing/${category}/`;
}
