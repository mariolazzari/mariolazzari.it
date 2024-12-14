import { Hero } from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";
import { getUserInfo, getUserRepos, getUserInfoExtra } from "@/actions/github";
import { LastGithubActivities } from "@/components/Github";
import { Certification } from "@/types/Certification";
import { getLastCertifications } from "@/actions/certifications";
import LastCertifications from "@/components/Certifications/LastCertifications";
import { Hobbies } from "@/components/Hobbies";

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
  const certs: Certification[] = getLastCertifications();

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />
      <LastGithubActivities
        info={githubUser}
        repos={lastRepos}
        infoExtra={extra}
      />
      <LastCertifications certifications={certs} />
      <Hobbies />
    </div>
  );
}

export default HomePage;
