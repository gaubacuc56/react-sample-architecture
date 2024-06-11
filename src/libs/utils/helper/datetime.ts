/**
 * Formats a date object into a string representation based on the specified format.
 *
 * This function takes a date object and a format string and returns a string representing
 * the date formatted according to the specified format. The format string can include various
 * placeholders for different components of the date and time.
 *
 * @param date The date object to format.
 * @param format The format string specifying how the date should be formatted.
 *
 * @returns {string} Returns the formatted date string.
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Adjust as per your requirement
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

/**
 * Parses a date string into a Date object based on the specified format.
 *
 * This function takes a date string and a format string and returns a Date object representing
 * the parsed date. The format string should match the structure of the date string to be parsed.
 *
 * @param dateString The date string to parse.
 * @param format The format string specifying the structure of the date string.
 *
 * @returns {Date} Returns the parsed Date object.
 */
export const parseDate = (dateString: string): Date => {
  // Assuming format is 'YYYY-MM-DD' for simplicity
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month is zero-based in Date constructor
};

/**
 * Calculates the difference in milliseconds between two date objects.
 *
 * This function takes two date objects and returns the difference in milliseconds between them.
 *
 * @param date1 The first date object.
 * @param date2 The second date object.
 *
 * @returns {number} Returns the difference in milliseconds between the two dates.
 */
export const diffInMilliseconds = (date1: Date, date2: Date): number => {
  return Math.abs(date1.getTime() - date2.getTime());
};

// Additional functions for date and time operations can be added here...
