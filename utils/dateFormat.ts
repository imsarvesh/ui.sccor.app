export default function dateFormat(
  datetime: string | number,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
): string {
  return new Date(+datetime).toLocaleDateString("en-US", options);
}
