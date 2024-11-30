import { GithubCalendar } from "@/components/GithubCalendar";
import Hero from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />
      <GithubCalendar />
    </div>
  );
}

export default HomePage;
