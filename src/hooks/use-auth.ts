/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useState } from "react";
import db from "@/lib/axios";
import Cookies from "js-cookie";

interface LoginSchema {
  email: string;
  password: string;
}

interface AuthData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (values: LoginSchema) => {
    setLoading(true);
    setError(null);
    try {
      const res = await db.post("/login", values);
      const token = res.data.token;
      Cookies.set("token", token);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const register = async (values: AuthData) => {
    setLoading(true);
    setError(null);
    if (values.password !== values.confirmPassword) {
      setError("Password dan konfirmasi harus sama");
      setLoading(false);
      return;
    }

    try {
      await db.post("/register", values);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    router.reload();
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
};
