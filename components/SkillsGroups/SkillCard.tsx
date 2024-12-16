import { SkillCardProps } from "./SkillCardProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function SkillCard({ skill }: SkillCardProps) {
  const { id, icon, name, url } = skill;
  const t = useTranslations("Skills");
  const description = t(`${id}Desc`);
  const use = t(`${id}Use`);

  return (
    <Link href={url} target="_blank">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            {icon} {name}
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="text-justify text-sm space-y-4 h-[280px]">
          <p>{description}</p>
          <p>{use}</p>
        </CardContent>
        <CardFooter>
          <LinkIcon />
        </CardFooter>
      </Card>
    </Link>
  );
}
