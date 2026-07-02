import { getArtworks } from "@/actions/museumHub";
import { MuseumHub } from "@/views/Projects/MuseumHub";
import { Metadata } from "next";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Museum Hub",
};

async function MuseumHubPage() {
  const res = await getArtworks("vermeer");
  if (!res.success) {
    toast.error("Error fetching data");
    return;
  }

  return <MuseumHub data={res.data} />;
}

export default MuseumHubPage;
