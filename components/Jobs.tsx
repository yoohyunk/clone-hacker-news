"use client";
import React, { useState, useEffect } from "react";
import { fetchHackerJobsStories, Job } from "../util/fetchJobs";
import Link from "next/link";

interface HackerJobsListProps {
  initialPage?: number;
}

const HackerJobsList: React.FC<HackerJobsListProps> = ({ initialPage = 1 }) => {
  const [stories, setStories] = useState<Job[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedStories = await fetchHackerJobsStories(page, 30);
      setStories(fetchedStories);
    } catch {
      setError("Failed to fetch stories");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, [page]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <ul>
            {stories.map((story, index) => (
              <li key={story.id}>
                <span>{(page - 1) * 30 + index + 1}. </span>
                <a href={story.url}>{story.title}</a>

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

export default HackerJobsList;
