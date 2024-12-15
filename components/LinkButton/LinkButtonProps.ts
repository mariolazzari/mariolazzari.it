import { ReactNode } from "react";

export type LinkButtonProps = {
  label: string;
  href: string;
} & Partial<{
  icon: ReactNode;
  className: string;
}>;
