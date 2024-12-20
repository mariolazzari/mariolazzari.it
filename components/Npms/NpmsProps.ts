import { NpmObject } from "@/types/npm/NpmObject";

export type NpmsProps = {
  npms: NpmObject[];
  year?: "last" | number;
  locale: string;
};
