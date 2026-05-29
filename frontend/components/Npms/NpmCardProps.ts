import { Downloads } from "@/types/npm/Downloads";
import { Package } from "@/types/npm/Package";
import { Year } from "@/types/Year";

export type NpmCardProps = {
  npm: Package;
  downloads: Downloads;
  year?: Year;
};
