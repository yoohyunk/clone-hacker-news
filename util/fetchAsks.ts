export interface Ask {
  id: number;
  descendants: number;
  by: string;
  kids: number[];
  time: number;
  type: "story" | "comment";
  score: number;
  title: string;
  text?: string;
}

export async function fetchHackerAsksStories(
  page: number = 1,
  limit: number = 30
): Promise<Ask[]> {
  const url =
    "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty";
  const res = await fetch(url);
  const storyIds: number[] = await res.json();

  const start = (page - 1) * limit;
  const paginatedIds = storyIds.slice(start, start + limit);

  const askPromises: Promise<Ask>[] = paginatedIds.map(async (id) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return res.json();
  });

  return Promise.all(askPromises);
}
