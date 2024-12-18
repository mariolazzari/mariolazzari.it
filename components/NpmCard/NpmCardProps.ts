import { Downloads } from "@/types/npm/Downloads";
import { Package } from "@/types/npm/Package";
import { Score } from "@/types/npm/Score";

export type NpmCardProps = {
  npm: Package;
  downloads: Downloads;
  score: Score;
};
