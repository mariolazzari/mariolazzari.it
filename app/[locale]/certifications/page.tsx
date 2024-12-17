import { getCertifications } from "@/actions/certifications";
import { Certification } from "@/components/Certifications";
import { CertificationsFilter } from "@/components/Certifications/CertificationsFilter";
import { Subtitle } from "@/components/Typography";
import { PageProps } from "@/types/PageProps";
import { GraduationCap } from "lucide-react";

type Props = PageProps<void, { search: string }>;

async function CertificationsPage({ searchParams }: Props) {
  const { search = "" } = await searchParams;

  const certs = getCertifications(search);

  return (
    <section className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <GraduationCap size={64} />
        <Subtitle text="Le mie certificazioni" />
      </div>
      <CertificationsFilter />
      <div className="flex justify-center items-center flex-wrap gap-16">
        {certs.map(cert => (
          <Certification key={cert.title} certification={cert} />
        ))}
      </div>
    </section>
  );
}

export default CertificationsPage;
