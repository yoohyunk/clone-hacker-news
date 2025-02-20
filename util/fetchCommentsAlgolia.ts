export interface HNComment {
  objectID: string;
  created_at: string;
  author: string;
  comment_text: string;
}

export async function fetchHNComments(
  page: number = 0,
  hitsPerPage: number = 30
): Promise<HNComment[]> {
  const response = await fetch(
    `https://hn.algolia.com/api/v1/search_by_date?tags=comment&hitsPerPage=${hitsPerPage}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch comments from Algolia");
  }
  const data = await response.json();
  return data.hits;
}
