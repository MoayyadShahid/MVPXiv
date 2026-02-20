const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/**
 * Formats "YYYY-MM-DD" → "Feb 19, 2026"
 */
export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const monthIdx = parseInt(month, 10) - 1;
  const dayNum = parseInt(day, 10);
  return `${MONTHS[monthIdx]} ${dayNum}, ${year}`;
}
