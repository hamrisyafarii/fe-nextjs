import { ThemeProvider } from "@/components/theme-provider";
import { CategoryProvider } from "@/context/useCategoryContext";
import { TaskProvider } from "@/context/useTaskContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TaskProvider>
      <CategoryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </CategoryProvider>
    </TaskProvider>
  );
}
