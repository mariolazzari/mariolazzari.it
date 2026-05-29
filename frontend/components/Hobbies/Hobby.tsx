import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { HobbyProps } from "./HobbyProps";
import { LinkIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function Hobby({ title, description, icon, href }: HobbyProps) {
  const locale = useLocale();

  return (
    <Link href={href} locale={locale}>
      <Card className="w-[350px] group bg-linear-to-br from-background to-secondary border-muted hover:border-primary shadow-xl">
        <CardHeader>
          <CardTitle className="font-semibold text-xl flex items-center gap-2 group-hover:text-primary">
            {icon}
            {title}
          </CardTitle>
          <CardDescription className="flex justify-center"></CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 h-[200px]">
          <p className="text-justify">{description}</p>
        </CardContent>

        <CardFooter>
          <LinkIcon className="group-hover:text-primary group-hover:animate-bounce" />
        </CardFooter>
      </Card>
    </Link>
  );
}
