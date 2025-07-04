import Head from "next/head";
import LoginForm from "@/components/Fragments/LoginForm";
import AuthLayouts from "@/components/Layouts/AuthLayouts";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Task Manager</title>
      </Head>

      <AuthLayouts
        title="Masuk"
        subTitle="Yuk, tandai tugas harian mu disini"
        type="login"
      >
        <LoginForm />
      </AuthLayouts>
    </>
  );
}
