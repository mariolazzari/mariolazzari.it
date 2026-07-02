import { MuseunHubResponse } from "@/types";
import { ArtworkCard } from "./ArtworkCard";

type Props = {
  data: MuseunHubResponse;
};

export function MuseumHub({ data }: Props) {
  if (data.total < 1) {
    return (
      <p className="text-lg text-center text-destructive">No record found</p>
    );
  }

  return (
    <div className="py-4 space-y-4">
      <h2 className="text-center text-3xl">Museum Hub</h2>

      <div className="flex justify-center items-center flex-wrap gap-8">
        {data.items.map(item => (
          <ArtworkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
