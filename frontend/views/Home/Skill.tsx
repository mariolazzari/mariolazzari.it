import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  img: string;
  href: string;
};

export function Skill({ title, description, img, href }: Props) {
  return (
    <Card className="w-64">
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
      <CardFooter className="h-12">
        <Link href={href} target="_blank">
          <LinkIcon size={16} />
        </Link>
      </CardFooter>
    </Card>
  );
}
