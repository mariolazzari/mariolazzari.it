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
      <Card className="group bg-background border hover:border-primary">
        <CardHeader className="h-[100px]">
          <CardTitle className="group-hover:text-primary text-xl">
            {title}
          </CardTitle>
          <CardDescription>{toNow(date, locale)}</CardDescription>
        </CardHeader>

        <CardContent className="h-[250px] flex items-center">
          <Image
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
