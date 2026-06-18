import Image from "next/image";
import { Certification } from "@/type/Certification";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { toNow } from "@/lib/dates";
import { Lens } from "../ui/lens";

type Props = {
  certification: Certification;
};

export function CertificationCard({ certification }: Props) {
  const SIZE = 24;

  return (
    <a
      href={certification.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer"
      aria-label={certification.title}
    >
      <Card className="w-full max-w-sm border-none p-0 shadow-none">
        <MagicCard
          gradientColor="#2563EB"
          gradientOpacity={0.18}
          gradientSize={320}
          className="border border-blue-500/15"
        >
          <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
            <CardTitle>{certification.title}</CardTitle>
            <CardDescription>{toNow(certification.date)}</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Lens zoomFactor={2} lensSize={150} ariaLabel="Zoom Area">
              <Image
                src={certification.imagePath}
                alt={certification.title}
                width={350}
                height={250}
              />
            </Lens>
          </CardContent>
          <CardFooter className="border-border border-t p-4 [.border-t]:pt-4 space-x-1">
            {certification.tags.map(tag => (
              <Image
                key={tag}
                src={`/images/${tag}.svg`}
                width={SIZE}
                height={SIZE}
                alt={tag}
              />
            ))}
          </CardFooter>
        </MagicCard>
      </Card>
    </a>
  );
}
