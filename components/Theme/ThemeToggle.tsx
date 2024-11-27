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
        return <FaSun size={32} />;

      case "dark":
        return <FaMoon size={32} />;

      default:
        return <CiSettings size={32} />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{renderIcon()}</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <FaSun size={32} /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <FaMoon size={32} />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <CiSettings size={32} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
