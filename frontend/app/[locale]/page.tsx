import { Hero } from "@/components/Hero";
import { SkillsBadges } from "@/components/SkillsBadges";
import { LastGithubActivities } from "@/components/Github";
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

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <SkillsBadges />

      <Suspense>
        <LastCertifications />
      </Suspense>

      <Suspense>
        <LastGithubActivities />
      </Suspense>
      <Hobbies />
    </div>
  );
}

export default HomePage;
