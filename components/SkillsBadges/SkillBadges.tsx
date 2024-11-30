import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkillBadgesProps } from "./SkillBadgesProps";

export function SkillBadges({ title, skills }: SkillBadgesProps) {
  return (
    <Card className="bg-gradient-to-br from-background to-muted border border-secondary group hover:border-primary">
      <CardHeader>
        <CardTitle className="text-xl font-semibold group-hover:text-primary">
          {title}
        </CardTitle>
        <CardDescription className="hidden"></CardDescription>
      </CardHeader>
      <CardContent className="w-[350px] h-[270px]">
        {skills.map(skill => (
          <Badge className="px-2 mr-2 my-1" key={skill.id} variant="secondary">
            <Link
              className="flex items-center gap-2 text-lg hover:text-primary"
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
