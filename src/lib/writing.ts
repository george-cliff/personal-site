import { getCollection, type CollectionEntry } from 'astro:content';
import { categoryUrl, type Category } from '../data/writing';

export type Post = CollectionEntry<'writing'>;

// Newest first, optionally limited to one category; ties broken by id so the order is stable.
// Drafts are included by `astro dev` only, so they never reach the production build.
export async function getPosts(category?: Category) {
  const posts = await getCollection(
    'writing',
    ({ data }) => (import.meta.env.DEV || !data.draft) && (!category || data.category === category),
  );

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id),
  );
}

export function postUrl(post: Post) {
  return `${categoryUrl(post.data.category)}${post.id}/`;
}
