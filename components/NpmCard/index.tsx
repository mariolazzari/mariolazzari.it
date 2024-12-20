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
import { getNpmDownloads } from "@/actions/npm";
import { subYears } from "date-fns";
import { Area } from "@/components/Charts";

export async function NpmCard({ npm, downloads }: NpmCardProps) {
  const counts = await getNpmDownloads(
    npm.name,
    subYears(new Date(), 1),
    new Date()
  );

  return (
    <Card className="w-[350px] h-[400px]">
      <CardHeader>
        <CardTitle>{npm.name}</CardTitle>
        <CardDescription className="h-[50px]">
          {npm.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[220px]">
        <Area
          series={[
            {
              name: "Downloads",
              data: counts.downloads.map(d => ({ x: d.day, y: d.downloads })),
            },
          ]}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={npm.links.npm} target="_blank">
          <LinkIcon />
        </Link>

        <div className="flex gap-1 items-center">
          <Download /> {downloads.monthly}
        </div>
      </CardFooter>
    </Card>
  );
}
