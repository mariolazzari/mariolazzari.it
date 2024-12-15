import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillBadgesProps } from "./SkillBadgesProps";
import { Badge } from "../ui/badge";

export function SkillBadges({ title, skills }: SkillBadgesProps) {
  return (
    <Card className="bg-background border border-secondary group hover:border-primary">
      <CardHeader>
        <CardTitle className="text-xl font-semibold group-hover:text-primary">
          {title}
        </CardTitle>
        <CardDescription className="hidden"></CardDescription>
      </CardHeader>
      <CardContent className="w-[350px] h-[270px] grid grid-cols-2 grid-flow-row-dense">
        {skills.map(skill => (
          <Link
            key={skill.id}
            className="flex items-center gap-1 text-lg hover:text-primary"
            href={skill.url}
            target="_blank"
          >
            <Badge
              className="px-2 py-1 gap-1 hover:bg-primary"
              variant="secondary"
            >
              {skill.icon}
              {skill.name}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
