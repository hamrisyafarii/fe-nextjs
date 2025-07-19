import { useAuth } from "@/hooks/use-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RegisterFormSchema, RegisterSchema } from "@/schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading } = useAuth();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (values) => {
    await register(values);
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Masukkan email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Label className="mt-2 flex items-center gap-2 text-xs">
          <Checkbox
            checked={showPassword}
            onCheckedChange={(chacked) => setShowPassword(!!chacked)}
          />
          ShowPassword
        </Label>

        <Button type="submit" className="w-full">
          {loading ? "loading..." : "Daftar"}
        </Button>
      </form>
    </Form>
  );
};
export default RegisterForm;
