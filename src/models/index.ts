export type ComparisonOperator =
  | "eq" // равно
  | "ne" // не равно
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
  value: any;
}

export interface AndCondition<T> {
  and: Array<FilterCondition<T>>;
}

export interface OrCondition<T> {
  or: Array<FilterCondition<T>>;
}

export interface NotCondition<T> {
  not: FilterCondition<T>;
}

export type FilterCondition<T> =
  | FieldCondition<T>
  | AndCondition<T>
  | OrCondition<T>
  | NotCondition<T>;

export interface AdvancedFilter<T> {
  where?: FilterCondition<T>;
  orderBy?: Array<{ field: keyof T; direction: "asc" | "desc" }>;
  limit?: number;
  offset?: number;
}
