import { ArtWork, Paginated } from "@/types";
import { ArtworkCard } from "./ArtworkCard";
import { MdMuseum } from "react-icons/md";
import { SearchBox } from "./SearchBox";

type Props = {
  response: Paginated<ArtWork[]>;
};

export function MuseumHub({ response }: Props) {
  const { data, total, page, pages } = response;

  return (
    <div className="py-4 space-y-4">
      <MdMuseum size={64} className="mx-auto" />
      <h2 className="text-center text-3xl font-semibold">Museum Hub</h2>

      <SearchBox currentPage={page} totalPages={pages} totalItems={total} />

      <div className="flex justify-center items-start flex-wrap gap-8 mb-16">
        {data.map(item => (
          <ArtworkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
