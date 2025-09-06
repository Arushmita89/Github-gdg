import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import Button from "./ui/button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Button
      onClick={toggle}
      variant="ghost"
      size="icon"
      className="relative h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      <Sun className="h-5 w-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500 dark:text-yellow-400 transition-all duration-300 ease-in-out scale-100 dark:scale-0 rotate-0 dark:-rotate-90" />
      <Moon className="h-5 w-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out scale-0 dark:scale-100 rotate-90 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
