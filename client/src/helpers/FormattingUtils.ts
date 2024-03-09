const DEFAULT_DATE_LOCALE = "fr-CA";

export const dateFormatter = (date: Date | undefined, locale?: string) => {
  if (date != null) {
    const formattingOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    if (locale == null) {
      locale = DEFAULT_DATE_LOCALE;
    }
    if (typeof date.getMonth != "function") {
      try {
        date = new Date(date);
      } catch (error) {
        console.log(error);
      }
    }
    return date.toLocaleDateString(locale, formattingOptions);
  } else {
    return "Error, date undefined";
  }
}