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
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

export function Certification({ certification }: CertificationProps) {
  const { title, imagePath, date, url } = certification;

  const renderDate = () => {
    return formatDistanceToNow(date, { locale: it, addSuffix: true });
  };

  return (
    <Link href={url} target="_blank">
      <Card className="group bg-background border hover:border-primary">
        <CardHeader className="h-[100px]">
          <CardTitle className="group-hover:text-primary text-xl">
            {title}
          </CardTitle>
          <CardDescription>{renderDate()}</CardDescription>
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
          <LinkIcon className="group-hover:text-primary group-hover:animate-pulse" />
        </CardFooter>
      </Card>
    </Link>
  );
}
