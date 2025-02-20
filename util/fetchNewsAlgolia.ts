export interface Story {
  id: number;
  descendants: number;
  by: string;
  kids: number[];
  time: number;
  type: "story" | "comment";
  score: number;
  title: string;
  url?: string;
}

export async function fetchAlgoliaStoriesByDate(
  targetDate: string,
  page: number = 1,
  limit: number = 30
): Promise<Story[]> {
  const startDate = new Date(targetDate);
  const endDate = new Date(targetDate);
  endDate.setDate(endDate.getDate() + 1);

  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  const numericFilters = `created_at_i>=${startTimestamp},created_at_i<${endTimestamp}`;

  const apiPage = page - 1;

  const endpoint = `https://hn.algolia.com/api/v1/search?hitsPerPage=${limit}&page=${apiPage}&numericFilters=${encodeURIComponent(
    numericFilters
  )}`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Algolia API 요청에 실패했습니다.");
  }
  const data = await res.json();

  const stories: Story[] = data.hits.map((hit: any) => ({
    id: parseInt(hit.objectID, 10),
    descendants: hit.num_comments || 0,
    by: hit.author,
    kids: [],
    time: hit.created_at_i,
    type: "story",
    score: hit.points,
    title: hit.title,
    url: hit.url,
  }));

  return stories;
}
