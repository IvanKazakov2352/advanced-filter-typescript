export type ComparisonOperator =
  | "eq" // равно
  | "not" // не равно
  | "gt" // больше
  | "gte" // больше или равно
  | "lt" // меньше
  | "lte" // меньше или равно
  | "in" // в массиве
  | "nin" // не в массиве
  | "like" // похоже (для строк)
  | "ilike"; // похоже без учета регистра

export const operators: Record<
  ComparisonOperator,
  (a: any, b: any) => boolean
> = {
  eq: (a, b) => a === b,
  not: (a, b) => a !== b,
  gt: (a, b) => a > b,
  gte: (a, b) => a >= b,
  lt: (a, b) => a < b,
  lte: (a, b) => a <= b,
  in: (a, b) => Array.isArray(a) && a.includes(b),
  nin: (a, b) => Array.isArray(a) && !a.includes(b),
  like: (a, b) =>
    typeof a === "string" && typeof b === "string" && a.includes(b),
  ilike: (a, b) =>
    typeof a === "string" &&
    typeof b === "string" &&
    a.toLowerCase().includes(b.toLowerCase()),
};
