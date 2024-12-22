import { RepositoryCardProps } from "./RepositoryCardProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toNow } from "@/lib/dates";
import { Dot, Eye, GitFork, Star } from "lucide-react";

export function RepositoryCard({
  title,
  description,
  language,
  stars,
  watchers,
  forks,
  isPrivate,
  updated,
}: RepositoryCardProps) {
  const renderBullet = () => {
    switch (language) {
      case "JavaScript":
        return <Dot size={48} color="#f1e05a" />;

      case "TypeScript":
        return <Dot size={48} color="#3178c6" />;

      case "Go":
        return <Dot size={48} color="#00add8" />;

      default:
        return <Dot size={48} />;
    }
  };

  return (
    <Card className="w-[350px] h-[250px]">
      <CardHeader>
        <CardTitle>
          {title} {isPrivate}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{toNow(updated)}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          {renderBullet()} {language}
        </div>
        <div className="flex items-center justify-end gap-2">
          <span className="flex items-center">
            <Star size={16} /> {stars}
          </span>

          <span className="flex items-center">
            <Eye size={16} /> {watchers}
          </span>

          <span className="flex items-center">
            <GitFork size={16} /> {forks}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
