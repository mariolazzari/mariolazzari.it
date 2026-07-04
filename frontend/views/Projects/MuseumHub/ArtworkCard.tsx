import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lens } from "@/components/ui/lens";
import { MagicCard } from "@/components/ui/magic-card";
import { PixelImage } from "@/components/ui/pixel-image";
import { Artwork } from "@/types";
import { Eye, Info } from "lucide-react";
import Link from "next/link";
import { ArtworkInfo } from "./ArtworkInfo";
import { Button } from "@/components/ui/button";

type Props = {
  item: Artwork;
};

export function ArtworkCard({ item }: Props) {
  return (
    <Card className="w-xs sm:w-sm p-0 rounded-xl">
      <CardHeader className="relative h-80 overflow-hidden p-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <Lens
            zoomFactor={2.5}
            lensSize={200}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <PixelImage src={item.image_preview_url} grid="8x8" />{" "}
          </Lens>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-md">{item.title}</CardTitle>
        <CardDescription>{item.museum}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Link
          className="w-full"
          href={item.image_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View full image"
        >
          <Button className="w-full cursor-pointer">
            <Eye /> High Quality Version
          </Button>
        </Link>

        <ArtworkInfo artwork={item} />
      </CardFooter>
    </Card>
  );
}
