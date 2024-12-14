import { ReactNode } from "react";

export type Layout<T = void> = Readonly<{
  children: ReactNode;
  params: Promise<
    {
      locale: string;
    } & T
  >;
}>;
