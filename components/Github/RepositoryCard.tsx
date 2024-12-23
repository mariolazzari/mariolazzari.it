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
import { Badge } from "../ui/badge";

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
  const renderContent = () => {
    const icons = [
      { id: "stars", value: stars, icon: <Star /> },
      { id: "watchers", value: watchers, icon: <Eye /> },
      { id: "forks", value: forks, icon: <GitFork /> },
    ];

    return (
      <div className="flex items-center justify-center gap-4">
        {icons.map(({ id, icon, value }) => (
          <span key={id} className="flex items-center text-lg gap-1">
            {icon} {value}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Link href={href} target="_blank">
      <Card className="group w-[350px] h-[220px]">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {title}
            <Badge variant="outline">{isPrivate ? "private" : "public"}</Badge>
          </CardTitle>
          <CardDescription className="text-justify h-8">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
        <CardFooter>
          <Dot className="-ml-8" size={64} color={getLanguageColor(language)} />
          <p className="-ml-5">{language}</p>
          <p className="ml-auto">{toNow(updated)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
