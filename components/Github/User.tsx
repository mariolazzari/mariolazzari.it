import { Kpi, KpisProps } from "@/components/Charts";
import { UserProps } from "./UserProps";
import { Users } from "lucide-react";

export function User({ user }: UserProps) {
  const kpis: KpisProps[] = [
    {
      title: "Followers",
      value: user.followers.toFixed(0),
      icon: <Users />,
    },
  ];

  return (
    <div>
      {kpis.map(kpi => (
        <Kpi key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
