import { IconCloud } from "@/components/ui/icon-cloud";

export function SkillsCloud() {
  const skills = [
    "angular",
    "c",
    "cpp",
    "cs",
    "css",
    "docker",
    "eclipse",
    "electron",
    "express",
    "fastify",
    "git",
    "github",
    "githubactions",
    "go",
    "graphql",
    "html",
    "java",
    "linux",
    "logo",
    "mongo",
    "mongoose",
    "mssql",
    "mui",
    "mysql",
    "netbeans",
    "nextjs",
    "nodejs",
    "nodered",
    "npm",
    "oracle",
    "pnpm",
    "postgres",
    "prisma",
    "python",
    "react",
    "redis",
    "redux",
    "rust",
    "shadcn",
    "sqldev",
    "sqlite",
    "tailwind",
    "ts",
    "vite",
    "vitejs",
    "vitest",
    "visualstudio",
    "zod",
  ].map(img => `/images/${img}.svg`);

  return (
    <div className="flex justify-center items-center h-64">
      <IconCloud images={skills} />
    </div>
  );
}
