export type Paginated<T> = {
  total: number;
  page: number;
  pages: number;
  per_page: number;
  data: T;
};
