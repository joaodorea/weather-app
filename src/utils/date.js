export function getWeekdayName(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString('us', {weekday: 'short'})
}
