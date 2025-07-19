/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/lib/axios";
import { useEffect, useState } from "react";

interface commentSchema {
  id: number;
  content: string;
  taskId: number;
  createdAt: string;
}

export const useComments = (taskId: number) => {
  const [comments, setComments] = useState<commentSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getComment = async () => {
    try {
      setLoading(true);
      const comments = await db.get(`/comment/task/${taskId}`);

      setComments(comments.data.data);
    } catch (error: any) {
      console.error("Error get comment", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (content: string) => {
    setLoading(true);
    try {
      const res = await db.post(`/comments`, { taskId, content });
      setComments((prev) => [res.data.data, ...prev]);
    } catch (error: any) {
      console.error("Failed to create comment:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId)  getComment();
  }, [taskId]);

  return {
    comments,
    loading,
    error,
    createComment,
  };
};
