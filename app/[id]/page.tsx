"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchItem, fetchItems } from "@/util/fetchItem";

interface Comment {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: number[];
}

interface StoryDetail {
  id: number;
  title: string;
  by: string;
  text?: string;
  time: number;
  kids?: number[];
}

const StoryDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [story, setStory] = useState<StoryDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data: StoryDetail = await fetchItem(Number(id));
        setStory(data);

        if (data.kids && data.kids.length > 0) {
          const commentsData: Comment[] = await fetchItems(data.kids);
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error fetching story or comments", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {story && (
        <>
          <h1>{story.title}</h1>
          <p>
            {story.by} | {new Date(story.time * 1000).toLocaleString()}
          </p>
          {story.text && (
            <div dangerouslySetInnerHTML={{ __html: story.text }} />
          )}
          <hr />
          <h2>comments</h2>
          {comments.length === 0 && <p>there is no comment</p>}
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p dangerouslySetInnerHTML={{ __html: comment.text }} />
                <small>
                  {comment.by} |{" "}
                  {new Date(comment.time * 1000).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default StoryDetailPage;
