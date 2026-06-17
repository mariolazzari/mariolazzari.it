import { certifications } from "@/data/certfifications";
import { Title } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CertificationCard } from "@/components/Cards";

export function LastCertifications() {
  const certs = certifications.slice(0, 6);

  return (
    <div className="flex flex-col items-center gap-8 pb-16">
      <Title>Le mie ultime certificazioni</Title>
      <div className="flex justify-center items-center flex-wrap gap-8">
        {certs.map(cert => (
          <CertificationCard key={cert.title} certification={cert} />
        ))}
      </div>

      <Button>
        .<Link href="/certifications">Mostra tutte</Link>
      </Button>
    </div>
  );
}
