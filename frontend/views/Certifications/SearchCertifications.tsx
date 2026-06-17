"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler, SubmitEventHandler, useState } from "react";
import { SearchBadge } from "./SearchBadge";
import {
  SiDocker,
  SiGo,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRust,
  SiTypescript,
} from "react-icons/si";

type Props = {
  search: string;
  total: number;
};

export function SearchCertifications({ search = "", total = 0 }: Props) {
  const [filter, setFilter] = useState(search);
  const router = useRouter();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    router.push(`/certifications?search=${filter}`);
  };

  const onReset = () => {
    setFilter("");
    router.push("/certifications");
  };

  const onBadgeClick = (filter: string) => {
    setFilter(filter);
    router.push(`/certifications?search=${filter}`);
  };

  const badges = [
    { img: <SiGo />, label: "Go" },
    { img: <SiNextdotjs />, label: "NextJS" },
    { img: <SiReact />, label: "React" },
    { img: <SiNodedotjs />, label: "NodeJS" },
    { img: <SiTypescript />, label: "TypeScript" },
    { img: <SiJavascript />, label: "JavaScript" },
    { img: <SiDocker />, label: "Docker" },
    { img: <SiRust />, label: "Rust" },
    { img: <SiMongodb />, label: "Mongo" },
    { img: <SiPostgresql />, label: "Postgres" },
    { img: <SiRedis />, label: "Redis" },
  ];

  return (
    <form
      className="w-full max-w-xl flex flex-col items-center gap-4"
      onSubmit={onSubmit}
    >
      <Input
        className="w-full"
        placeholder="Cerca certificazione..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <div className="space-x-4">
        <Button className="w-24" type="submit" disabled={filter === ""}>
          <Search />
          Cerca
        </Button>
        <Button
          className="w-24"
          variant="outline"
          type="button"
          onClick={onReset}
        >
          <X /> Tutte
        </Button>
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {badges.map(b => (
          <SearchBadge
            key={b.label}
            img={b.img}
            label={b.label}
            selected={filter === b.label}
            onClick={() => onBadgeClick(b.label)}
          />
        ))}
      </div>

      <p className="flex items-center gap-4">
        Certificazioni trovate:
        <span className="font-bold text-primary">{total}</span>
      </p>
    </form>
  );
}
