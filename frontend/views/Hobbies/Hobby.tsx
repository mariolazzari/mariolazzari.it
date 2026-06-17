import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlareHover } from "@/components/ui/glare-hover";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function Hobby({ title, description, icon }: Props) {
  return (
    <GlareHover duration={600}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="w-80 h-20">
          <p>{description}</p>
        </CardContent>
      </Card>
    </GlareHover>
  );
}
