import {
  AndCondition,
  ComparisonOperator,
  CustomFilterCondition,
  CustomOperator,
  FieldCondition,
  FilterCondition,
  OrCondition,
} from "../models";

export class FilterBuilder {
  public static custom = <T, K extends keyof T, V>(
    field: K,
    operator: CustomOperator,
    value: V
  ): CustomFilterCondition<T> => ({
    custom: { field, operator, value }
  });

  public static field = <T, K extends keyof T>(
    field: K,
    operator: ComparisonOperator,
    value: T[K]
  ): FieldCondition<T> => ({ field, operator, value })

  public static and = <T>(...conditions: FilterCondition<T>[]): AndCondition<T> => ({ and: conditions })
  public static or = <T>(...conditions: FilterCondition<T>[]): OrCondition<T> => ({ or: conditions })

  public static eq = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "eq", value)

  public static not = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "not", value)

  public static gt = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "gt", value)

  public static gte = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "gte", value)

  public static lt = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "lt", value)

  public static lte = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "lte", value)

  public static in = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "in", value)

  public static nin = <T, K extends keyof T>(field: K, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "nin", value)

  public static like = <T, K extends keyof T>(field: keyof T, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "like", value)

  public static ilike = <T, K extends keyof T>(field: keyof T, value: T[K]): FieldCondition<T> =>
    FilterBuilder.field(field, "ilike", value)
}
