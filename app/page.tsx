import { Github } from "@/components/Github";
import Hero from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";
import { getUserInfo, getUserProjects } from "@/actions/github";

async function HomePage() {
  const githubUser = await getUserInfo();

  const res = await getUserProjects();
  console.log(res);

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />
      <Github user={githubUser} />
    </div>
  );
}

export default HomePage;
