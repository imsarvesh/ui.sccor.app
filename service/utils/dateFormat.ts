// convert a date to a date format

export const dateFormat = (date: Date) => {
  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toString();
};
