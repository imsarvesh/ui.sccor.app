// write a function to convert a date to instagram like time ago

export const timeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec`;
  }
  if (diffInSeconds < 3600) {
    return `${diffInMinutes}m`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }
  return `${diffInDays}d`;
};

export default timeAgo;
