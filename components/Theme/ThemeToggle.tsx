"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const renderIcon = () => {
    switch (theme) {
      case "light":
        return <FaSun size={24} />;

      case "dark":
        return <FaMoon size={24} />;

      default:
        return <CiSettings size={24} />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{renderIcon()}</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <FaSun size={24} /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <FaMoon size={24} />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <CiSettings size={24} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
