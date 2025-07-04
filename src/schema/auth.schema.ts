import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email wajib di isi" })
    .email({ message: "Invalid karakter email" }),
  password: z
    .string({ message: "Password wajib di isi" })
    .min(4, "Password minimal 4 karakter")
    .max(25, "Passowrd maksimal 25 karakter"),
});

export const RegisterSchema = z
  .object({
    name: z
      .string({ message: "Nama wajib di isi" })
      .min(3, "Username minimal 3 karakter")
      .max(20),
    email: z.string({ message: "Email wajib di isi" }).email(),
    password: z
      .string({ message: "Password wajib di isi" })
      .min(4, "Password minimal 4 karakter")
      .max(25),
    confirmPassword: z
      .string({ message: "Konfirmasi Passowrd wajib di isi" })
      .min(4, "Konfirmasi password minimal 4 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export type LoginFormSchema = z.infer<typeof LoginSchema>;
export type RegisterFormSchema = z.infer<typeof RegisterSchema>;
