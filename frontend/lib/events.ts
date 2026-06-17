import { MouseEventHandler } from "react";

export const stopPropagation: MouseEventHandler<
  HTMLLIElement | HTMLButtonElement
> = e => e.stopPropagation();
