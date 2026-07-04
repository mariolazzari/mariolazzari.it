import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Artwork } from "@/types";
import { Info } from "lucide-react";

type Props = {
  artwork: Artwork;
};

export function ArtworkInfo({ artwork }: Props) {
  const { author, title, year, description } = artwork;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="cursor-pointer w-full" variant="outline">
          <Info />
          Dettagli opera
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full max-w-sm flex-col gap-1">
        <h2 className="text-lg">{author}</h2>
        <h2 className="text-lg font-semibold italic">
          {title}{" "}
          {year && <span className="text-md font-normal">({year})</span>}
        </h2>
        <div className="max-h-96 overflow-y-auto">
          <p className="text-sm text-justify">{description}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
