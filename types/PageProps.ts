import { Params } from "./Params";

export type PageProps<
  TParams extends Params | void,
  TSearch extends Params | void
> = Readonly<{
  params: Promise<TParams>;
  searchParams: Promise<TSearch>;
}>;
