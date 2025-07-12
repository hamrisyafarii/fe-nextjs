/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import db from "@/lib/axios";

export interface Category {
  id: number;
  name: string;
}

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  createCategory: (name: string) => Promise<void>;
  updateCategory: (id: number, name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await db.get("/category");
      setCategories(res.data.data);
    } catch (err: any) {
      setError(err.message || "Gagal memuat kategori");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (name: string) => {
    try {
      const res = await db.post("/category", { name });
      setCategories((prev) => [...prev, res.data.data]);
    } catch (err: any) {
      console.error("Gagal membuat kategori", err);
    }
  };

  const updateCategory = async (id: number, name: string) => {
    try {
      const res = await db.put(`/category/${id}`, { name });
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? res.data.data : cat))
      );
    } catch (err: any) {
      console.error("Gagal update kategori", err);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await db.delete(`/category/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err: any) {
      console.error("Gagal hapus kategori", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
        fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within CategoryProvider");
  }
  return context;
};
