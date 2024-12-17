"use client";

import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Form from "next/form";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";
import { Input } from "../ui/input";
import {
  SiNodedotjs,
  SiReact,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiLinkedin,
} from "react-icons/si";
import { Search, GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "@/i18n/routing";

export function CertificationsFilter() {
  const [search, setSearch] = useState("");

  const locale = useLocale();

  const tags = [
    { id: "Node", icon: <SiNodedotjs /> },
    { id: "React", icon: <SiReact /> },
    { id: "Mongo", icon: <SiMongodb /> },
    { id: "JavaScript", icon: <SiJavascript /> },
    { id: "TypeScript", icon: <SiTypescript /> },
    { id: "Sql", icon: <SiPostgresql /> },
    { id: "LinkedIn", icon: <SiLinkedin /> },
  ];

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearch(e.target.value);
  };

  const onResetClick: MouseEventHandler<HTMLButtonElement> = () => {
    setSearch("");
  };

  const onTagClick = (tag: string) => {
    setSearch(tag);
  };

  return (
    <Form
      className="flex flex-col gap-4 w-[350px]"
      action={`/${locale}/certifications`}
    >
      <Input
        name="search"
        value={search}
        placeholder="Cerca titolo..."
        onChange={onSearchChange}
      />

      <div className="flex justify-center flex-wrap gap-2">
        {tags.map(({ id, icon }) => (
          <Link key={id} href={`/certifications?search=${id}`} locale={locale}>
            <Badge
              className="border-primary gap-1 px-2 py-1"
              variant={search === id ? "default" : "outline"}
              onClick={() => onTagClick(id)}
            >
              {icon} {id}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center flex-wrap gap-2">
        <Link href="/certifications" locale={locale}>
          <Button
            className="w-24"
            type="reset"
            variant="outline"
            onClick={onResetClick}
          >
            <GraduationCap />
            All
          </Button>
        </Link>

        <Button className="w-24" type="submit" disabled={search === ""}>
          <Search />
          Search
        </Button>
      </div>
    </Form>
  );
}
