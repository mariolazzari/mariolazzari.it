import { Downloads } from "@/types/npm/Downloads";
import { Package } from "@/types/npm/Package";

export type NpmCardProps = {
  npm: Package;
  downloads: Downloads;
};
