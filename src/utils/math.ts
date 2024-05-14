export function preciseAdd(a: number, b: number) {
  const factor = Math.pow(10, 6); // Choose a factor to scale the numbers
  return (Math.round(a * factor) + Math.round(b * factor)) / factor;
}
