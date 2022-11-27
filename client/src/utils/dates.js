import dates_EN from "date-fns/locale/en-GB";
import dates_IT from "date-fns/locale/it";
import { formatDistanceToNow } from "date-fns";

const dates = {
  it: dates_IT,
  en: dates_EN,
};

// dates options
const getOptions = locale => ({
  locale: dates[locale],
  includeSeconds: false,
  addSuffix: true,
});

// render date
export const renderDate = (date, locale) => {
  date = new Date(date);

  return formatDistanceToNow(date, getOptions(locale));
};
