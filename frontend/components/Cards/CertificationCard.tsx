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
import { Button } from "@/components/ui/button";
import { toNow } from "@/lib/dates";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";

type Props = {
  certification: Certification;
};

export function CertificationCard({ certification }: Props) {
  const SIZE = 24;

  return (
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
          <Image
            src={certification.imagePath}
            alt={certification.title}
            width={350}
            height={250}
          />
        </CardContent>
        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4 space-x-1">
          <Button variant="ghost" size="icon">
            <Link href={certification.url} target="_blank">
              <LinkIcon />
            </Link>
          </Button>
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
  );
}
