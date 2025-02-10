import { Hero } from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";
import { getUserInfo, getUserRepos, getUserInfoExtra } from "@/actions/github";
import { LastGithubActivities } from "@/components/Github";
import { getLastCertifications } from "@/actions/certifications";
import { LastCertifications } from "@/components/Certifications";
import { Hobbies } from "@/components/Hobbies";
import { Metadata } from "next";
import { Suspense } from "react";

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
  const [githubUser, certs] = await Promise.all([
    getUserInfo(),
    getLastCertifications(),
  ]);
  const [lastRepos, extra] = await Promise.all([
    getUserRepos({
      direction: "desc",
      page: 1,
      per_page: 6,
      username: "mariolazzari",
    }),
    getUserInfoExtra(githubUser),
  ]);

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />

      <Suspense fallback={<p>Loading...</p>}>
        <LastGithubActivities
          info={githubUser}
          repos={lastRepos}
          infoExtra={extra}
        />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <LastCertifications certifications={certs} />
      </Suspense>
      <Hobbies />
    </div>
  );
}

export default HomePage;
