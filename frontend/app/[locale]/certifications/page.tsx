import { Title } from "@/components/Typography";
import { certifications } from "@/data/certfifications";
import { SearchCertifications, SearchResults } from "@/views/Certifications";
import { PageProps } from "@/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
};

type Props = PageProps<void, { search: string }>;

async function CertificationsPage({ searchParams }: Props) {
  const { search = "" } = await searchParams;

  function parseDate(date: string) {
    const [day, month, year] = date.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }

  const filtered = certifications
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const dateDiff = parseDate(b.date) - parseDate(a.date);
      if (dateDiff !== 0) return dateDiff;
      return a.title.localeCompare(b.title, "it");
    });

  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-4 py-8">
      <Title>Le mie certificazioni</Title>
      <SearchCertifications search={search} total={filtered.length} />
      <SearchResults results={filtered} />
    </div>
  );
}

export default CertificationsPage;
