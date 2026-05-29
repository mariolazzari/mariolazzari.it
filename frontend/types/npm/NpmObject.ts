import { Downloads } from "./Downloads";
import { Flags } from "./Flags";
import { Package } from "./Package";
import { Score } from "./Score";

export type NpmObject = {
  downloads: Downloads;
  dependents: number;
  updated: string;
  searchScore: number;
  package: Package;
  score: Score;
  flags: Flags;
};
