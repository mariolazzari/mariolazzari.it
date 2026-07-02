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
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard className="p-0">
        <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.museum}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-4">
          <Lens
            zoomFactor={2}
            lensSize={150}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <PixelImage src={item.image_preview_url} grid="8x8" />
          </Lens>
        </CardContent>
        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
          <Link href={item.image_url} target="_blank">
            <Eye />
          </Link>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
