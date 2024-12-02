import Hero from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";
import { getUserInfo, getUserRepos, getUserInfoExtra } from "@/actions/github";
import { LastGithubActivities } from "@/components/Github";

async function HomePage() {
  // data fetching
  const githubUser = await getUserInfo();
  const [lastRepos, extra] = await Promise.all([
    getUserRepos({
      direction: "desc",
      page: 1,
      per_page: 5,
      username: "mariolazzari",
    }),
    getUserInfoExtra(githubUser),
  ]);

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />
      <LastGithubActivities
        info={githubUser}
        repos={lastRepos}
        infoExtra={extra}
      />
    </div>
  );
}

export default HomePage;
