import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  isAfter,
  isBefore,
  isValid,
  parseISO,
} from 'date-fns';

/**
 * Safely parses a date string or Date object and validates it.
 * @param {string | Date} date - The date to parse (string or Date object).
 * @returns {Date | null} The parsed Date object, or null if invalid.
 */
function safeParseDateInternal(date: string | Date): Date | null {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;

    if (!isValid(parsedDate)) {
      return null;
    }

    return parsedDate;
  } catch {
    return null;
  }
}

/**
 * Formats a date according to the specified format string.
 * @param {string | Date} date - The date to format (string or Date object).
 * @param {string} formatStr - The format string (e.g., 'yyyy-MM-dd', 'MMMM d, yyyy').
 * @returns {string} The formatted date string, or empty string if invalid.
 */
export function formatDate(date: string | Date, formatStr: string): string {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate) {
    return '';
  }

  try {
    return format(parsedDate, formatStr);
  } catch {
    return '';
  }
}

/**
 * Formats a date with time in a standard format.
 * @param {string | Date} date - The date to format (string or Date object).
 * @returns {string} The formatted date-time string, or empty string if invalid.
 */
export function formatDateTime(date: string | Date): string {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate) {
    return '';
  }

  try {
    return format(parsedDate, 'LLLL d, yyyy h:mm a');
  } catch {
    return '';
  }
}

/**
 * Formats a date with timezone offset information.
 * @param {string | Date} date - The date to format (string or Date object).
 * @returns {string} The formatted date string with timezone, or empty string if invalid.
 */
export function formatDateWithTimezone(date: string | Date): string {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate) {
    return '';
  }

  try {
    const formatted = format(parsedDate, 'LLLL d, yyyy h:mm a');
    const offset = format(parsedDate, 'XXX');

    return `${formatted} UTC${offset}`;
  } catch {
    return '';
  }
}

/**
 * Checks if a date is after another date.
 * @param {string | Date} date - The date to check (string or Date object).
 * @param {Date} compareDate - The date to compare against.
 * @returns {boolean} True if date is after compareDate, false otherwise.
 */
export function isDateAfter(date: string | Date, compareDate: Date): boolean {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate || !isValid(compareDate)) {
    return false;
  }

  return isAfter(parsedDate, compareDate);
}

/**
 * Checks if a date is before another date.
 * @param {string | Date} date - The date to check (string or Date object).
 * @param {Date} compareDate - The date to compare against.
 * @returns {boolean} True if date is before compareDate, false otherwise.
 */
export function isDateBefore(date: string | Date, compareDate: Date): boolean {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate || !isValid(compareDate)) {
    return false;
  }

  return isBefore(parsedDate, compareDate);
}

/**
 * Calculates the difference in days between two dates.
 * @param {string | Date} date - The date to calculate from (string or Date object).
 * @param {Date} compareDate - The date to compare against.
 * @returns {number} The difference in days, or 0 if invalid.
 */
export function getDaysDifference(
  date: string | Date,
  compareDate: Date,
): number {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate || !isValid(compareDate)) {
    return 0;
  }

  return differenceInDays(parsedDate, compareDate);
}

/**
 * Calculates the difference in hours between two dates.
 * @param {string | Date} date - The date to calculate from (string or Date object).
 * @param {Date} compareDate - The date to compare against.
 * @returns {number} The difference in hours, or 0 if invalid.
 */
export function getHoursDifference(
  date: string | Date,
  compareDate: Date,
): number {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate || !isValid(compareDate)) {
    return 0;
  }

  return differenceInHours(parsedDate, compareDate);
}

/**
 * Calculates the difference in minutes between two dates.
 * @param {string | Date} date - The date to calculate from (string or Date object).
 * @param {Date} compareDate - The date to compare against.
 * @returns {number} The difference in minutes, or 0 if invalid.
 */
export function getMinutesDifference(
  date: string | Date,
  compareDate: Date,
): number {
  const parsedDate = safeParseDateInternal(date);

  if (!parsedDate || !isValid(compareDate)) {
    return 0;
  }

  return differenceInMinutes(parsedDate, compareDate);
}

/**
 * Parses a date string into a Date object.
 * @param {string} date - The date string to parse.
 * @returns {Date} The parsed Date object.
 * @throws {Error} If the date string is invalid.
 */
export function parseDate(date: string): Date {
  const parsedDate = parseISO(date);

  if (!isValid(parsedDate)) {
    throw new Error(`Invalid date string: ${date}`);
  }

  return parsedDate;
}

/**
 * Sorts an array of dates in ascending order.
 * @param {Date[]} dates - The array of dates to sort.
 * @returns {Date[]} The sorted array of dates.
 */
export function sortByDate(dates: Date[]): Date[] {
  return dates.sort((a, b) => a.getTime() - b.getTime());
}
