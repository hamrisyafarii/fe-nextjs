import RegisterForm from "@/components/Fragments/RegisterForm";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const { token } = useSession();
  const router = useRouter();

  if (token) {
    router.push("/dashboard");
  }

  return (
    <>
      <Header />

      <AuthLayouts
        title="Daftar"
        subTitle="Daftarkan akun mu sekarang!"
        type="register"
      >
        <RegisterForm />
      </AuthLayouts>

      <Footer />
    </>
  );
}
