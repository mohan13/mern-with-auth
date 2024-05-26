export function formatDateTime(dateTimeString, service_time) {
  const now = new Date();
  const date = new Date(dateTimeString);
  const diffInMs = date.getTime() - now.getTime(); // Difference in milliseconds

  const diffInHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
  const diffInMinutes = diffInMs / (1000 * 60); // Convert milliseconds to minutes
  if (diffInMinutes <= 0 && Math.abs(diffInMinutes) <= service_time) {
    // If within service duration range, display 'queue time'
    return "queue time";
  }

  if (diffInMinutes > 0 && diffInMinutes <= 60) {
    // If less than or equal to 60 minutes, display minutes left
    const minutesLeft = Math.ceil(diffInMinutes);
    return `${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""} left`;
  } else if (diffInMinutes > 0 && diffInHours <= 24) {
    // If less than or equal to 24 hours, display hours left
    const hoursLeft = Math.ceil(diffInHours);
    return `${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""} left`;
  } else {
    // If greater than 24 hours, display formatted date and time
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }
}

export const weeks = ["Sunday", "Monday"];
