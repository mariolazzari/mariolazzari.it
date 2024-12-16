import { LinkButton } from "../LinkButton";
import { Certification } from "./Certification";
import { LastGithubActivitiesProps } from "./LasfCertificationsProps";
import { GraduationCap } from "lucide-react";

export function LastCertifications({
  certifications,
}: LastGithubActivitiesProps) {
  return (
    <section className="flex flex-col items-center gap-8 my-8">
      <div className="flex flex-col items-center">
        <GraduationCap size={64} />
        <h4 className="text-4xl font-semibold text-center">
          Le mie ultime certificazioni
        </h4>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-16 max-w-7xl">
        {certifications.map(cer => (
          <Certification key={cer.title} certification={cer} />
        ))}
      </div>

      <LinkButton
        label="Certificazioni"
        href="/certifications"
        icon={<GraduationCap />}
      />
    </section>
  );
}
