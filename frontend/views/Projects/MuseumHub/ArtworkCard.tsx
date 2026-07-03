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
import { Eye } from "lucide-react";
import Link from "next/link";

type Props = {
  item: Artwork;
};

export function ArtworkCard({ item }: Props) {
  return (
    <Card className="w-full min-w-xs max-w-sm border-none p-0">
      <MagicCard>
        <CardHeader className="p-4">
          <CardTitle className="">{item.title}</CardTitle>
          <CardDescription>{item.museum}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Lens
            zoomFactor={2.5}
            lensSize={200}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <PixelImage src={item.image_preview_url} grid="8x8" />
          </Lens>
        </CardContent>
        <CardFooter>
          <Link href={item.image_url} target="_blank">
            <Eye />
          </Link>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
