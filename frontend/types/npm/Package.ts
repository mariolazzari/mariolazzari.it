import { User } from "./User";

export type Package = {
  name: string;
  keywords: string[];
  version: string;
  description: string;
  publisher: User;
  maintainers: User[];
  license: string;
  date: string;
  links: {
    npm: string;
  };
};
