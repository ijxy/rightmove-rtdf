export function unique<T extends string | number>(vals: Array<T>) {
  return Array.from(new Set(vals));
}
