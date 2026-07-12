import { ArtWork } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { MdMuseum } from "react-icons/md";
import { SearchBox } from "./SearchBox";

type Props = {
  artWorks: ArtWork[];
};

export function MuseumHub({ artWorks = [] }: Props) {
  return (
    <div className="py-4 space-y-4">
      <MdMuseum size={64} className="mx-auto" />
      <h2 className="text-center text-3xl font-semibold">Museum Hub</h2>

      <SearchBox />

      <h2 className="text-center font-semibold">
        Artworks found:
        <span className="font-bold text-primary ml-2">{artWorks.length}</span>
      </h2>

      <div className="flex justify-center items-start flex-wrap gap-8 mb-16">
        {artWorks.slice(0, 50).map(item => (
          <ArtworkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
