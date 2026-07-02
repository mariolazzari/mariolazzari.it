export type Artwork = {
  id: string;
  author?: string;
  title: string;
  description: string;
  museum: string;
  image_url: string;
  image_preview_url: string;
  year?: string;
  source: string;
};

export type MuseunHubResponse = {
  total: number;
  page: number;
  pages: number;
  per_page: number;
  items: Artwork[];
};
