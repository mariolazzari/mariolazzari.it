import { Skill } from "./Skill";

export function Skills() {
  const skills = [
    {
      id: "nextjs",
      href: "https://nextjs.org",
    },
    {
      id: "go",
      href: "https://go.dev",
    },
    {
      id: "ts",
      href: "https://www.typescriptlang.org",
    },
    {
      id: "nodejs",
      href: "https://nodejs.org",
    },
    {
      id: "postgres",
      href: "https://www.postgresql.org",
    },
    {
      id: "mongo",
      href: "https://www.mongodb.com",
    },
    {
      id: "redis",
      href: "https://redis.io",
    },
    {
      id: "docker",
      href: "https://www.docker.com",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-wrap gap-16 py-8">
      {skills.map(({ id, href }, idx) => (
        <Skill
          key={id}
          id={id}
          title={`title${idx + 1}`}
          description={`desc${idx + 1}`}
          href={href}
        />
      ))}
    </div>
  );
}
