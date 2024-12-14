import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillBadgesProps } from "./SkillBadgesProps";
import { LinkButton } from "../LinkButton";

export function SkillBadges({ title, skills }: SkillBadgesProps) {
  return (
    <Card className="bg-background border border-secondary group hover:border-primary">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="hidden"></CardDescription>
      </CardHeader>
      <CardContent className="w-[350px] h-[270px]">
        {skills.map(skill => (
          <Badge
            key={skill.id}
            className="px-2 mr-2 my-1 rounded-xl hover:animate-pulse"
            variant="secondary"
          >
            <Link
              className="flex items-center gap-2 text-lg"
              href={skill.url}
              target="_blank"
            >
              {skill.name}
              {skill.icon}
            </Link>
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
