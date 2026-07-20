import { getArtworks } from "@/actions/museumHub";
import { MuseumHub } from "@/views/Projects/MuseumHub";
import { Metadata } from "next";
import { PageProps } from "@/types";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Museum Hub",
};

type SearchParams = {
  query: string;
  limit: string;
  offset: string;
};

type Props = PageProps<void, SearchParams>;

async function MuseumHubPage({ searchParams }: Props) {
  const { query = "", limit = "10", offset = "0" } = await searchParams;
  const locale = await getLocale();

  const res = await getArtworks(query, locale, limit, offset);
  if (!res.success) {
    throw new Error(res.error);
  }

  return <MuseumHub response={res.data} />;
}

export default MuseumHubPage;
