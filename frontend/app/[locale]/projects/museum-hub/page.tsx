import { getArtworks } from "@/actions/museumHub";
import { MuseumHub } from "@/views/Projects/MuseumHub";
import { Metadata } from "next";
import { toast } from "sonner";
import { PageProps } from "@/types";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Museum Hub",
};

type SearchParams = {
  query: string;
};

type Props = PageProps<void, SearchParams>;

async function MuseumHubPage({ searchParams }: Props) {
  const { query = "" } = await searchParams;
  const locale = await getLocale();

  const res = await getArtworks(query, locale);
  if (!res.success) {
    toast.error("Error fetching data");
    return;
  }

  return <MuseumHub data={res.data} />;
}

export default MuseumHubPage;
