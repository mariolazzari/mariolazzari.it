import { getLastCertifications } from "@/actions/certifications";
import { LinkButton } from "../LinkButton";
import { Certification } from "./Certification";
import { GraduationCap } from "lucide-react";

export async function LastCertifications() {
  // data fetching
  const certs = await getLastCertifications();

  return (
    <section className="flex flex-col items-center gap-8 my-8">
      <div className="flex flex-col items-center">
        <GraduationCap size={64} />
        <h6 className="text-4xl font-semibold text-center">
          Le mie ultime certificazioni
        </h6>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-16 max-w-7xl">
        {certs.map(cer => (
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
