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

export interface FieldCondition<T> {
  field: keyof T;
  operator: ComparisonOperator;
  value: T[keyof T];
}

export interface AndCondition<T> {
  and: Array<FilterCondition<T>>;
}

export interface OrCondition<T> {
  or: Array<FilterCondition<T>>;
}

export type FilterCondition<T> =
  | FieldCondition<T>
  | AndCondition<T>
  | OrCondition<T>;

export interface AdvancedFilter<T> {
  where?: FilterCondition<T>;
  orderBy?: Array<{ field: keyof T; direction: "asc" | "desc" }>;
  limit?: number;
  offset?: number;
}
