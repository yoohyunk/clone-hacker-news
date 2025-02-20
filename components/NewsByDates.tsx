"use client";
import { fetchAlgoliaStoriesByDate, Story } from "@/util/fetchNewsAlgolia";
import Link from "next/link";
import { useEffect, useState } from "react";

type HackerNewsListByDateProps = {
  initialPage?: number;
};

const HackerNewsListByDate: React.FC<HackerNewsListByDateProps> = ({
  initialPage = 1,
}) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  const formattedDate = date.toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAlgoliaStoriesByDate(formattedDate, page, 30);
        console.log(data);
        setStories(data);
      } catch {
        setError("Failed to fetch stories");
      }
      setLoading(false);
    };

    fetchData();
  }, [formattedDate, page]);

  const changeDay = (delta: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + delta);
    setDate(newDate);
    setPage(1);
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + delta);
    setDate(newDate);
    setPage(1);
  };

  const changeYear = (delta: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + delta);
    setDate(newDate);
    setPage(1);
  };

  return (
    <div>
      <div>Stories from {date.toDateString()}</div>
      <div>
        Go back a <button onClick={() => changeDay(-1)}>day</button>,{" "}
        <button onClick={() => changeMonth(-1)}>month</button>, or{" "}
        <button onClick={() => changeYear(-1)}>year</button>. Go forward a{" "}
        <button onClick={() => changeDay(1)}>day</button>,{" "}
        <button onClick={() => changeMonth(1)}>month</button>, or{" "}
        <button onClick={() => changeYear(1)}>year</button>.
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <ul>
            {stories.map((story, index) => (
              <li key={story.id}>
                <span>{(page - 1) * 30 + index + 1}. </span>
                <a
                  href={story.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {story.title}
                </a>
                <p>
                  {story.score} points by {story.by}
                </p>
                <Link href={`/${story.id}`}>comments</Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-1">
            {page > 1 && (
              <button onClick={() => setPage(page - 1)}>Previous Page</button>
            )}
            <button onClick={() => setPage(page + 1)}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HackerNewsListByDate;
