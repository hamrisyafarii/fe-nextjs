import Link from "next/link";
import React from "react";

interface AuthSchema {
  title: string;
  subTitle: string;
  type: string;
  children: React.ReactNode;
}

const AuthLayouts = (props: AuthSchema) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-xs w-full border rounded-md p-4">
        <div className="pb-4">
          <h1 className="text-xl font-semibold">{props.title}</h1>
          <p className="text-sm text-primary">{props.subTitle}</p>
        </div>
        {props.children}
        {props.type === "login" && (
          <p className="mt-3 text-center text-xs text-foreground">
            belum punya akun?
            <Link className="underline" href="/register">
              Daftar
            </Link>
          </p>
        )}
        {props.type === "register" && (
          <p className="mt-3 text-center text-xs text-foreground">
            sudah punya akun?
            <Link className="underline" href="/login">
              Masuk
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
export default AuthLayouts;
