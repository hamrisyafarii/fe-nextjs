/* eslint-disable @typescript-eslint/no-explicit-any */
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
    } catch (error: any) {
      console.log(error);
      setError("Tidak dapat memuat Task kamu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const createTask = async (values: TaskDataSchema) => {
    setLoading(true);
    try {
      const res = await db.post("/task", values);
      const newTask = res.data.data;

      setTasks((prev) => [...prev, newTask]);
      return;
    } catch (error: any) {
      console.error("Error create new Task", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: number, valuse: TaskDataSchema) => {
    setLoading(true);
    try {
      const res = await db.put(`/task/${id}`, valuse);

      console.log(res.data.data);
      const newDataUpdated = res.data.data;
      setTasks((prev) =>
        prev.map((item) => (item.id === id ? newDataUpdated : item))
      );
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      await db.delete(`/task/${id}`);

      setTasks((prev) => prev.filter((item) => item.id != id));
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    deleteTask,
    editTask,
    getAllTask,
  };
};
