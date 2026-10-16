import { getCollection } from 'astro:content';

// Newest first; undated posts last; ties broken by id so the order is stable.
export async function getDevlogPosts() {
  return (await getCollection('devlog')).sort(
    (a, b) =>
      (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0) ||
      a.id.localeCompare(b.id),
  );
}
