import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export function Skill({ id, title, description, href }: Props) {
  const t = useTranslations("Skills");
  const SIZE = 32;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Card className="w-full max-w-xs border-none p-0 shadow-none">
        <MagicCard className="p-0" gradientColor="hsl(var(--border))">
          <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Image
                className="size-8"
                src={`/images/${id}.svg`}
                alt={id}
                width={SIZE}
                height={SIZE}
              />
              {t(title)}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-32">
            <p>{t(description)}</p>
          </CardContent>
        </MagicCard>
      </Card>
    </a>
  );
}
