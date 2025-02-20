export async function fetchItem(id: number): Promise<any> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch item with id ${id}`);
  }
  const data = await res.json();
  return data;
}

export async function fetchItems(ids: number[]): Promise<any[]> {
  return Promise.all(ids.map((id) => fetchItem(id)));
}
