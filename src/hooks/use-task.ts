import db from "@/lib/axios";
import { TaskDataSchema } from "@/schema/task.schema";
import { useEffect, useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskDataSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTask = async () => {
    setLoading(true);
    try {
      const res = await db.get(`/tasks`);
      setTasks(res.data.data);
    } catch (error: unknown) {
      console.log(error);
      setError("Tidak dapat memuat Task kamu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  return { tasks, loading, error };
};
