import { Hero } from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";
import { getUserInfo, getUserRepos, getUserInfoExtra } from "@/actions/github";
import { LastGithubActivities } from "@/components/Github";
import { getLastCertifications } from "@/actions/certifications";
import { LastCertifications } from "@/components/Certifications";
import { Hobbies } from "@/components/Hobbies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Mario Lazzari",
    default: "Mario Lazzari",
  },
  description:
    "Mario Lazzari senior full stack developer JavaScript TypeScript NodeJS ReactJS Go Rest Api",
  keywords: [
    "Mario",
    "Lazzari",
    "JavaScript",
    "TypeScript",
    "NodeJS",
    "RectJS",
    "Go",
    "Rest",
    "Api",
  ],
};

async function HomePage() {
  // data fetching
  const githubUser = await getUserInfo();
  const [lastRepos, extra, certs] = await Promise.all([
    getUserRepos({
      direction: "desc",
      page: 1,
      per_page: 5,
      username: "mariolazzari",
    }),
    getUserInfoExtra(githubUser),
    getLastCertifications(),
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
      <LastCertifications certifications={certs} />
      <Hobbies />
    </div>
  );
}

export default HomePage;
