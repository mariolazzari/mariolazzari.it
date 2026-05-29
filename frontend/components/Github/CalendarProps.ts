import { Year } from "react-github-calendar";

export type CalendarProps = {
  username: string;
} & Partial<{
  year: Year;
}>;
