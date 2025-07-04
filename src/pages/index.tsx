import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="w-full max-w-md flex items-center justify-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="/login"
          className="rounded-md px-2 py-1 w-full bg-blue-500 text-foreground font-medium text-center"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-md px-2 py-1 w-full bg-gray-300 text-black font-medium text-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
