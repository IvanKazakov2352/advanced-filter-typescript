import {
  AndCondition,
  ComparisonOperator,
  FieldCondition,
  FilterCondition,
  OrCondition,
} from "../models";

export const FilterBuilder = {
  field: <T>(
    field: keyof T,
    operator: ComparisonOperator,
    value: any
  ): FieldCondition<T> => ({
    field,
    operator,
    value,
  }),

  and: <T>(...conditions: FilterCondition<T>[]): AndCondition<T> => ({
    and: conditions,
  }),

  or: <T>(...conditions: FilterCondition<T>[]): OrCondition<T> => ({
    or: conditions,
  }),

  eq: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "eq", value),

  not: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "not", value),

  gt: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "gt", value),

  gte: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "gte", value),

  lt: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "lt", value),

  lte: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "lte", value),

  in: <T>(field: keyof T, values: any[]): FieldCondition<T> =>
    FilterBuilder.field(field, "in", values),

  nin: <T>(field: keyof T, values: any[]): FieldCondition<T> =>
    FilterBuilder.field(field, "nin", values),

  like: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "like", value),

  ilike: <T>(field: keyof T, value: any): FieldCondition<T> =>
    FilterBuilder.field(field, "ilike", value),
};
