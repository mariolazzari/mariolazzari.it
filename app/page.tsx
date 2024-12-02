import Hero from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";
import { getUserInfo, getUserRepos } from "@/actions/github";
import { LastGithubActivities } from "@/components/Github";

async function HomePage() {
  // data fetching
  const [githubUser, lastActivities] = await Promise.all([
    getUserInfo(),
    getUserRepos({
      direction: "desc",
      page: 1,
      per_page: 5,
      username: "mariolazzari",
    }),
  ]);

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />
      <LastGithubActivities info={githubUser} repos={lastActivities} />
    </div>
  );
}

export default HomePage;
