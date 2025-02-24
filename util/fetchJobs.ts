export interface Job {
  id: number;
  by: string;
  time: number;
  type: "story" | "comment";
  score: number;
  title: string;
  text?: string;
  url?: string;
}

export async function fetchHackerJobsStories(
  page: number = 1,
  limit: number = 30
): Promise<Job[]> {
  const url =
    "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty";
  const res = await fetch(url);
  const storyIds: number[] = await res.json();

  const start = (page - 1) * limit;
  const paginatedIds = storyIds.slice(start, start + limit);

  const askPromises: Promise<Job>[] = paginatedIds.map(async (id) => {
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return res.json();
  });

  return Promise.all(askPromises);
}
