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
import { useLocale } from "next-intl";
import { toNow } from "@/lib/dates";

export function Certification({ certification }: CertificationProps) {
  const { title, imagePath, date, url } = certification;
  const locale = useLocale();

  return (
    <Link href={url} target="_blank">
      <Card className="group border-muted hover:border-primary bg-linear-to-br from-background to-secondary w-[350px]">
        <CardHeader className="h-[100px]">
          <CardTitle className="group-hover:text-primary">{title}</CardTitle>
          <CardDescription>{toNow(date, locale)}</CardDescription>
        </CardHeader>

        <CardContent className="h-[250px] flex items-center">
          <Image
            className="group-hover:scale-105"
            src={imagePath}
            alt={title}
            width={300}
            height={250}
            priority
          />
        </CardContent>

        <CardFooter className="h-[50px]">
          <LinkIcon className="group-hover:text-primary group-hover:animate-bounce" />
        </CardFooter>
      </Card>
    </Link>
  );
}
