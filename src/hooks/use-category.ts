/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/lib/axios";
import { useEffect, useState } from "react";

interface CategorySchema {
  id: number;
  name: string;
}

export const useCateogry = () => {
  const [cateogry, setCateogry] = useState<CategorySchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await db.get("/category");

      setCateogry(res.data.data);
    } catch (error: any) {
      setError(error.message || "Gagal mengambil data Category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const createCateogry = async (name: string) => {
    setLoading(true);
    try {
      const res = await db.post("/category", name);
      const newCategory = res.data.data;

      setCateogry((prev) => [...prev, newCategory]);
    } catch (error: any) {
      setError(error.message || "Gagal membuat kateogri");
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: number, name: string) => {
    try {
      const res = await db.put(`/category/${id}`, { name });
      const updated = res.data.data;

      setCateogry((prev) => prev.map((cat) => (cat.id === id ? updated : cat)));
    } catch (error: any) {
      setError(error.message || "Gagal mengupdate kategori");
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await db.delete(`/category/${id}`);
      setCateogry((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error: any) {
      setError(error.message || "Gagal menghapus kategori");
    }
  };

  return {
    cateogry,
    loading,
    error,
    createCateogry,
    updateCategory,
    deleteCategory,
  };
};
