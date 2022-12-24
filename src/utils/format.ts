/**
 *
 * @param {number} timeStamp
 * @returns {Date}
 *  */
export function formatUnixTimestamp(timeStamp: number) {
  const date = new Date(timeStamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return date;
}

/**
 *
 * @param {Date} Date
 * @returns {string}
 */
export function formatDateToDay(Date: Date) {
  return Date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' });
}
