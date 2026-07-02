import { CertificationCard } from "@/components/Cards";
import { Certification } from "@/types";

type Props = {
  results: Certification[];
};

export function SearchResults({ results = [] }: Props) {
  return (
    <div className="flex justify-center items-center flex-wrap gap-8">
      {results.map(r => (
        <CertificationCard key={r.title} certification={r} />
      ))}
    </div>
  );
}
