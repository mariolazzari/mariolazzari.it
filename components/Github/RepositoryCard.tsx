import { RepositoryCardProps } from "./RepositoryCardProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLanguageColor } from "@/lib/colors";
import { toNow } from "@/lib/dates";
import { Dot, Eye, GitFork, Star } from "lucide-react";
import Link from "next/link";

export function RepositoryCard({
  title,
  description,
  language,
  stars,
  watchers,
  forks,
  isPrivate,
  updated,
  href,
}: RepositoryCardProps) {
  return (
    <Link href={href} target="_blank">
      <Card className="w-[350px] h-[220px]">
        <CardHeader>
          <CardTitle>
            {title} {isPrivate}
          </CardTitle>
          <CardDescription className="text-justify h-8">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center text-lg gap-1">
              <Star /> {stars}
            </span>

            <span className="flex items-center text-lg gap-1">
              <Eye /> {watchers}
            </span>

            <span className="flex items-center text-lg gap-1">
              <GitFork /> {forks}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Dot className="-ml-8" size={64} color={getLanguageColor(language)} />
          <p className="-ml-5">{language}</p>
          <p className="ml-auto">{toNow(updated)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
