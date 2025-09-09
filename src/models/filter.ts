export interface FieldCondition<T> {
  field: keyof T;
  operator: ComparisonOperator;
  value: T[keyof T];
}

export type CustomOperator = string;

export interface CustomFilterCondition<T> {
  custom: {
    operator: CustomOperator;
    field: keyof T;
    value: any;
  };
}

export interface OperatorFunctions {
  [key: string]: (a: any, b: any) => boolean;
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
  | OrCondition<T>
  | CustomFilterCondition<T>;

export interface AdvancedFilter<T> {
  where?: FilterCondition<T>;
  orderBy?: Array<{ field: keyof T; direction: "asc" | "desc" }>;
  limit?: number;
  offset?: number;
}

export interface IFilter<T> {
  filter(items: T[], filterConfig: AdvancedFilter<T>): T[];
  registerCustomOperator<K extends keyof T>(
    operator: CustomOperator,
    handler: (fieldValue: K, filterValue: T[K]) => boolean
  ): void;
  unregisterCustomOperator(operator: CustomOperator): void;
  getCustomOperators(): string[];
}

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
