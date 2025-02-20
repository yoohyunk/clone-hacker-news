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

export async function fetchHackerNewsStories(
  type: "top" | "new" | "best" = "top",
  page: number = 1,
  limit: number = 30
): Promise<Story[]> {
  const endpoints: Record<"top" | "new" | "best", string> = {
    top: "https://hacker-news.firebaseio.com/v0/topstories.json",
    new: "https://hacker-news.firebaseio.com/v0/newstories.json",
    best: "https://hacker-news.firebaseio.com/v0/beststories.json",
  };

  const url = endpoints[type];
  const res = await fetch(url);
  const storyIds: number[] = await res.json();

  const start = (page - 1) * limit;
  const paginatedIds = storyIds.slice(start, start + limit);

  const storyPromises: Promise<Story>[] = paginatedIds.map(async (id) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return res.json();
  });

  return Promise.all(storyPromises);
}
