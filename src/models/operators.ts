export type ComparisonOperator =
  | "eq" // equal
  | "not" // not equal
  | "gt" // more
  | "gte" // greater than or equal to
  | "lt" // less
  | "lte" // less than or equal to
  | "in" // contain in array
  | "nin" // does not contain in array
  | "like" // сontains
  | "ilike"; // сontains case insensitive

export const operators: Record<ComparisonOperator, (a: any, b: any) => boolean> = {
  eq: (a, b) => a === b,
  not: (a, b) => a !== b,
  gt: (a, b) => a > b,
  gte: (a, b) => a >= b,
  lt: (a, b) => a < b,
  lte: (a, b) => a <= b,
  in: (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.some(item => b.includes(item));
    }
    return Array.isArray(a) && a.includes(b);
  },
  nin: (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return !a.some(item => b.includes(item));
    }
    return Array.isArray(a) && !a.includes(b);
  },
  like: (a, b) =>
    typeof a === "string" && typeof b === "string" && a.includes(b),
  ilike: (a, b) =>
    typeof a === "string" &&
    typeof b === "string" &&
    a.toLowerCase().includes(b.toLowerCase()),
};
