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
import Link from "next/link";

export function Hobby({ title, description, icon, href }: HobbyProps) {
  return (
    <Link href={href}>
      <Card className="w-[350px] group border border-muted hover:border-primary shadow-lg">
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
          <LinkIcon className="group-hover:text-primary group-hover:animate-ping" />
        </CardFooter>
      </Card>
    </Link>
  );
}
