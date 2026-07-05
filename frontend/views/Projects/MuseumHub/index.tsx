import { MuseunHubResponse } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { MdMuseum } from "react-icons/md";
import { SearchBox } from "./SearchBox";
import { MuseumsMap } from "./MuseumsMap";
import { Globe } from "@/components/ui/globe";

type Props = {
  data: MuseunHubResponse;
};

export function MuseumHub({ data }: Props) {
  const { items } = data;

  return (
    <div className="py-4 space-y-4">
      <MdMuseum size={64} className="mx-auto" />
      <h2 className="text-center text-3xl font-semibold">Museum Hub</h2>

      <SearchBox />

      <h2 className="text-center font-semibold">
        Artworks found:
        <span className="font-bold text-primary ml-2">{items.length}</span>
      </h2>

      <div className="flex justify-center items-start flex-wrap gap-8 mb-16">
        {items.map(item => (
          <ArtworkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
