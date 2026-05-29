import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="p-4">{children}</div>;
}
