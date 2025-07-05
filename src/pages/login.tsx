import Head from "next/head";
import LoginForm from "@/components/Fragments/LoginForm";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Task Manager</title>
      </Head>

      <Header />

      <AuthLayouts
        title="Masuk"
        subTitle="Yuk, tandai tugas harian mu disini"
        type="login"
      >
        <LoginForm />
      </AuthLayouts>

      <Footer />
    </>
  );
}
