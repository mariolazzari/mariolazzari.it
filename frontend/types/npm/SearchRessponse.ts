import { NpmObject } from "./NpmObject";

export type SearchResponse = {
  objects: NpmObject[];
  time: string;
  total: number;
};
