export function getWeekdayName(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString('us', {weekday: 'short'})
}

export function getTime2Digit(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
}
