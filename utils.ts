export function prepareTreeArray(arr: any[]) {
  const arrWithNoDupes = [...new Set(arr)];

  return Array.from(arrWithNoDupes).sort((a, b) => a - b);
}
