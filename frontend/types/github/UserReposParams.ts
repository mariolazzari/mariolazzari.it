import { Direction } from "./Direction";
import { Sort } from "./Sort";

export type UserReposParams = Partial<{
  username: string;
  sort: Sort;
  direction: Direction;
  per_page: number;
  page: number;
}>;
