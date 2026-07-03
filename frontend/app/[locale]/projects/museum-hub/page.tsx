import { getArtworks } from "@/actions/museumHub";
import { MuseumHub } from "@/views/Projects/MuseumHub";
import { Metadata } from "next";
import { toast } from "sonner";
import { PageProps } from "@/types";

export const metadata: Metadata = {
  title: "Museum Hub",
};

type SearchParams = {
  query: string;
  limit: string;
  offset: string;
  locale: string;
};

type Props = PageProps<void, SearchParams>;

async function MuseumHubPage({ searchParams }: Props) {
  const { query, locale, limit, offset } = await searchParams;

  const res = await getArtworks(query, +limit, +offset, locale);
  if (!res.success) {
    toast.error("Error fetching data");
    return;
  }

  return <MuseumHub query={query} data={res.data} />;
}

export default MuseumHubPage;
