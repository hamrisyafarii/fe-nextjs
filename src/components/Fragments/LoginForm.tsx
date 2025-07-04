import { useAuth } from "@/hooks/use-auth";
import { type LoginFormSchema, LoginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const { control, handleSubmit } = form;
  const { login, loading, error } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    await login(values);
  });

  return (
    <Form {...form}>
      {error && (
        <div className="text-red-500 font-bold text-lg px-2 py-1 mb-2">
          {error}
        </div>
      )}
      <form className="space-y-2" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="user@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
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
                  {...field}
                  placeholder="******"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label className="flex items-center gap-2 mt-4">
          <Checkbox
            checked={showPassword}
            onCheckedChange={(checked) => setShowPassword(!!checked)}
          />
          Show Password
        </Label>
        <Button
          disabled={loading}
          className="w-full text-primary-foreground bg-foreground my-2"
        >
          {loading ? "loading..." : "Masuk"}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
