import { Github } from "@/components/Github";
import Hero from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />
      <Github />
    </div>
  );
}

export default HomePage;
