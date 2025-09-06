import React from "react";
import { Sun, Moon } from "lucide-react";
import Button from "./ui/button";
import { useTheme } from "../components/theme-provider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative bg-gray-100 dark:bg-gray-800"
    >
      <Sun className={`h-5 w-5 transition-all ${theme === "dark" ? "opacity-0" : "opacity-100"}`} />
      <Moon className={`absolute h-5 w-5 transition-all ${theme === "dark" ? "opacity-100" : "opacity-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
