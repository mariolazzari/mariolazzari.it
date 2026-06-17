import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlareHover } from "@/components/ui/glare-hover";
import { Clock, GraduationCap, HardHat } from "lucide-react";

export function Counters() {
  const years = new Date().getFullYear() - 1997;

  const items = [
    { icon: <Clock />, title: years + "+", description: "Anni di esperienza" },
    { icon: <Clock />, title: "100+", description: "Progetti sviluppati" },
    { icon: <HardHat />, title: "Multiple", description: "Industries" },
    { icon: <GraduationCap />, title: "Continous", description: "Learner" },
  ];

  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {items.map(item => (
        <GlareHover className="rounded-md" key={item.title} duration={600}>
          <Card className="w-40">
            <CardHeader>
              <CardTitle className="flex gap-2">
                {item.icon}
                {item.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {item.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </GlareHover>
      ))}
    </div>
  );
}
