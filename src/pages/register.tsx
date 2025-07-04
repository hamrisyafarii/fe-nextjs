import RegisterForm from "@/components/Fragments/RegisterForm";
import AuthLayouts from "@/components/Layouts/AuthLayouts";

export default function RegisterPage() {
  return (
    <AuthLayouts
      title="Daftar"
      subTitle="Daftarkan akun mu sekarang!"
      type="register"
    >
      <RegisterForm />
    </AuthLayouts>
  );
}
