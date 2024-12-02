import { Kpi, KpisProps } from "@/components/Charts";
import { UserProps } from "./UserProps";
import { Users, Eye, Star, GitFork, FolderGit } from "lucide-react";

export function User({ info, extra }: UserProps) {
  const kpis: KpisProps[] = [
    {
      title: "Followers",
      value: info.followers.toFixed(0),
      icon: <Users />,
    },
    {
      title: "Following",
      value: info.following.toFixed(0),
      icon: <Eye />,
    },
    {
      title: "Progetti",
      value: info.public_repos.toFixed(0),
      icon: <FolderGit />,
    },
    {
      title: "Stelle",
      value: extra.stars.toFixed(0),
      icon: <Star />,
    },
    {
      title: "Fork",
      value: extra.forks.toFixed(0),
      icon: <GitFork />,
    },
  ];

  return (
    <div className="flex justify-center items-center flex-wrap gap-4">
      {kpis.map(kpi => (
        <Kpi key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
