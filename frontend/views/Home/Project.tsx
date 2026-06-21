import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

type Props = {
  title: string;
  description: string;
  text1: string;
  text2: string;
  images: string[];
  icon: ReactNode;
  href1: string;
  href2: string;
};

export function Project({
  title,
  description,
  text1,
  text2,
  icon,
  images,
  href1,
  href2,
}: Props) {
  return (
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard className="p-0 border border-primary/30" mode="gradient">
        <CardHeader className="h-27.5 border-border border-b p-4">
          <div className="flex items-center gap-3">
            <div className="shrink-0">{icon}</div>
            <div className="flex-1 text-left">
              <CardTitle className="text-left">{title}</CardTitle>
              <CardDescription className="mt-1 text-left">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 min-h-48 items-start">
            <p className="text-sm font-medium text-left">{text1}</p>
            <p className="text-sm font-medium text-left">{text2}</p>
          </div>
        </CardContent>

        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4 flex-col gap-2">
          <div className="w-full flex items-center gap-2">
            {images.map(img => (
              <Image
                key={img}
                src={`/images/${img}.svg`}
                alt={img}
                width={24}
                height={24}
              />
            ))}
          </div>

          <Button className="w-full" variant="outline" asChild>
            <Link
              href={href1}
              className="flex items-center justify-center gap-2"
            >
              {icon}
              {title}
            </Link>
          </Button>

          <Button className="w-full" asChild>
            <Link href={href2} target="_blank" rel="noopener noreferrer">
              <FaGithub />
              GitHub
            </Link>
          </Button>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
