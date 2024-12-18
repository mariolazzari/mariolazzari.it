import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NpmCardProps } from "./NpmCardProps";
import { LinkIcon, Download } from "lucide-react";
import { Link } from "@/i18n/routing";

export function NpmCard({ npm, downloads }: NpmCardProps) {
  return (
    <Link href={npm.links.npm} target="_blank">
      <Card className="w-[350px] h-[400px]">
        <CardHeader>
          <CardTitle>{npm.name}</CardTitle>
          <CardDescription className="h-[50px]">
            {npm.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[220px]"></CardContent>
        <CardFooter className="flex justify-between">
          <LinkIcon />

          <div className="flex gap-1 items-center">
            <Download /> {downloads.monthly}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
