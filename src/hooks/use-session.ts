import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useSession = (redirect = false) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLaoding] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");

    if (!storedToken && redirect) {
      router.push("/login");
    }
    setToken(storedToken || null);
    setLaoding(false);
  }, [redirect, router]);

  return { token, loading, isAuthenticated: !!token };
};
