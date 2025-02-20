// 예: app/comments/page.tsx 또는 컴포넌트 파일
"use client";

import { useEffect, useState } from "react";
import { fetchHNComments, HNComment } from "@/util/fetchCommentsAlgolia";

const CommentsList: React.FC = () => {
  const [comments, setComments] = useState<HNComment[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchHNComments(page)
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.objectID}>
              <p
                dangerouslySetInnerHTML={{ __html: comment.comment_text || "" }}
              />
              <small>
                {comment.author} -{" "}
                {new Date(comment.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-1">
        {page > 0 && (
          <button onClick={() => setPage(page - 1)}>previous page</button>
        )}
        <button onClick={() => setPage(page + 1)}>next page</button>
      </div>
    </div>
  );
};

export default CommentsList;
