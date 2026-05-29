export type DownloadsResponse = {
  start: string;
  end: string;
  package: string;
  downloads: [
    {
      downloads: number;
      day: string;
    }
  ];
};
