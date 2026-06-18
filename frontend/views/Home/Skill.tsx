import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  img: string;
  href: string;
};

export function Skill({ title, description, img, href }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image
              src={`/images/${img}.svg`}
              alt={title}
              width={32}
              height={32}
            />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-24">
          <p>{description}</p>
        </CardContent>
      </Card>
    </a>
  );
}
