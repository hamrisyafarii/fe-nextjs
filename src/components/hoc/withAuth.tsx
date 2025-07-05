/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withAuth = (WrappedComponents: React.ComponentType) => {
  const ComponentsWithAuth = (props: any) => {
    const { token, loading } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!token && !loading) {
        router.push("/login");
      }
    }, [loading, router, token]);

    if (loading || !token) {
      return <p>Loading...</p>;
    }
    return <WrappedComponents {...props} />;
  };
  return ComponentsWithAuth;
};

export default withAuth;
