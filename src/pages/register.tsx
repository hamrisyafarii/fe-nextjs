import RegisterForm from "@/components/Fragments/RegisterForm";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";

export default function RegisterPage() {
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
