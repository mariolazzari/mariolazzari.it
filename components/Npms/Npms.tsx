import { YearsPicker } from "../Pickers/YearsPicker";
import { Subtitle } from "../Typography";
import { NpmCard } from "./NpmCard";
import { NpmsProps } from "./NpmsProps";
import { redirect } from "@/i18n/routing";

export function Npms({ npms, year = "last", locale }: NpmsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Subtitle text="I mie pacchetti NPM" />

      <div className="flex justify-center items-center flex-wrap gap-16">
        {npms.map(npm => (
          <NpmCard
            key={npm.package.name}
            npm={npm.package}
            downloads={npm.downloads}
            year={year}
          />
        ))}
      </div>
    </div>
  );
}
