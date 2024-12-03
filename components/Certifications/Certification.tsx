import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CertificationProps } from "./CertificationProps";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import Image from "next/image";

export function Certification({ certification }: CertificationProps) {
  const { title, imagePath, date, url } = certification;

  return (
    <Link href={url} target="_blank">
      <Card className="group">
        <CardHeader>
          <CardTitle className="group-hover:text-primary text-xl">
            {title}
          </CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={250}
            priority
          />
        </CardContent>
        <CardFooter>
          <LinkIcon className="group-hover:text-primary group-hover:animate-pulse" />
        </CardFooter>
      </Card>
    </Link>
  );
}
