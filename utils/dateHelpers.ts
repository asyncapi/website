import { format, formatDistance, isAfter, isBefore, parseISO, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

export function formatDate(date: string | Date, formatStr: string): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatStr);
}

export function formatDateTime(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'LLLL d, yyyy h:mm a');
}

export function formatDateWithTimezone(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const formatted = format(parsedDate, 'LLLL d, yyyy h:mm a');
  const offset = format(parsedDate, 'XXX');
  return `${formatted} UTC${offset}`;
}

export function isDateAfter(date: string | Date, compareDate: Date): boolean {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isAfter(parsedDate, compareDate);
}

export function isDateBefore(date: string | Date, compareDate: Date): boolean {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isBefore(parsedDate, compareDate);
}

export function getDaysDifference(date: string | Date, compareDate: Date): number {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return differenceInDays(parsedDate, compareDate);
}

export function getHoursDifference(date: string | Date, compareDate: Date): number {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return differenceInHours(parsedDate, compareDate);
}

export function getMinutesDifference(date: string | Date, compareDate: Date): number {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return differenceInMinutes(parsedDate, compareDate);
}

export function parseDate(date: string): Date {
  return parseISO(date);
}

export function sortByDate(dates: Date[]): Date[] {
  return dates.sort((a, b) => a.getTime() - b.getTime());
}
