export function parseDate12(dateStr: string) {
  var year = parseInt(dateStr.substring(0, 4), 10);
  var month = parseInt(dateStr.substring(4, 6), 10) - 1;
  var day = parseInt(dateStr.substring(6, 8), 10);
  var hour = parseInt(dateStr.substring(8, 10), 10);
  var minute = parseInt(dateStr.substring(10, 12), 10);
  return new Date(year, month, day, hour, minute);
}

export function parseDate8(dateStr: string) {
  var year = parseInt(dateStr.substring(0, 4), 10);
  var month = parseInt(dateStr.substring(4, 6), 10) - 1;
  var day = parseInt(dateStr.substring(6, 8), 10);
  return new Date(year, month, day);
}
