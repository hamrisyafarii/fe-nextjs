/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import db from "@/lib/axios";
import { TaskDataSchema } from "@/schema/task.schema";

interface TaskContextType {
  tasks: TaskDataSchema[];
  loading: boolean;
  error: string | null;
  createTask: (task: TaskDataSchema) => Promise<void>;
  getAllTask: () => Promise<void>;
  editTask: (id: number, task: TaskDataSchema) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskDataSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTask = async () => {
    setLoading(true);
    try {
      const res = await db.get("/tasks");
      setTasks(res.data.data);
    } catch (err: any) {
      console.error(err);
      setError("Gagal memuat task");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: TaskDataSchema) => {
    setLoading(true);
    try {
      const res = await db.post("/task", task);
      const newTask = res.data.data;
      setTasks((prev) => [newTask, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError("Gagal membuat task");
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: number, task: TaskDataSchema) => {
    setLoading(true);
    try {
      const res = await db.put(`/task/${id}`, task);
      const updated = res.data.data;
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      console.error(err);
      setError("Gagal update task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      await db.delete(`/task/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error(err);
      setError("Gagal hapus task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        createTask,
        getAllTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
