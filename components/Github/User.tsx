import { Kpi, KpisProps } from "@/components/Charts";
import { UserProps } from "./UserProps";
import { Users, Eye, Star, GitFork, FolderGit } from "lucide-react";

export function User({ user, stars }: UserProps) {
  const kpis: KpisProps[] = [
    {
      title: "Followers",
      value: user.followers.toFixed(0),
      icon: <Users />,
    },
    {
      title: "Following",
      value: user.following.toFixed(0),
      icon: <Eye />,
    },
    {
      title: "Progetti",
      value: user.public_repos.toFixed(0),
      icon: <FolderGit />,
    },
    {
      title: "Stelle",
      value: stars.toFixed(0),
      icon: <Star />,
    },
    {
      title: "Fork",
      value: user.public_gists.toFixed(0),
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
