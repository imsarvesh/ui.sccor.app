// write a function to convert a date to instagram like time ago

export const timeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  // Get start of day for both dates to compare just the date part
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const dayDiff = Math.round(
    (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Handle Today, Yesterday, Tomorrow
  if (dayDiff === 0) {
    return "Today";
  } else if (dayDiff === -1) {
    return "Yesterday";
  } else if (dayDiff === 1) {
    return "Tomorrow";
  }

  // Handle same day but different times
  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)} sec`;
  }
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInMinutes)}m`;
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  }

  // For dates more than 1 day away, show the day difference
  if (dayDiff > 1) {
    return `In ${dayDiff} days`;
  } else if (dayDiff < -1) {
    return `${Math.abs(dayDiff)} days ago`;
  }

  return `${Math.floor(diffInDays)}d`;
};

export default timeAgo;
