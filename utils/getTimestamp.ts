export default function getTimestamp(datetime: string | number): number {
  return new Date(datetime).getTime();
}
