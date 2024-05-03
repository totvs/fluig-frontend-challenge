/**
 *  Retrieves a difference in days between two dates.
 *  @param {date} firstDate first date.
 *  @param {date} secondDate second date.
 *  @returns {number} negative number if firstDate is bigger than secondDate.
 *  @returns {number} positive number if firstDate is less than secondDate.
 */
export function diffInDays(firstDate, secondDate) {
  const diff = Math.ceil(
    (firstDate - secondDate) / 1000 / 60 / 60 / 24
  );

  return diff
}
