import {
  AdvancedFilter,
  ComparisonOperator,
  FieldCondition,
  FilterCondition,
} from "../models";

export class Filter<T> {
  private operators: Record<ComparisonOperator, (a: any, b: any) => boolean> = {
    eq: (a, b) => a === b,
    ne: (a, b) => a !== b,
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

  public filter(items: T[], filterConfig: AdvancedFilter<T>): T[] {
    let result = items;

    if (filterConfig.where) {
      result = result.filter((item) =>
        this.evaluateCondition(item, filterConfig.where!)
      );
    }

    if (filterConfig.orderBy && filterConfig.orderBy.length > 0) {
      result = this.applySorting(result, filterConfig.orderBy);
    }

    if (filterConfig.offset !== undefined) {
      result = result.slice(filterConfig.offset);
    }

    if (filterConfig.limit !== undefined) {
      result = result.slice(0, filterConfig.limit);
    }

    return result;
  }

  private evaluateCondition(item: T, condition: FilterCondition<T>): boolean {
    if ("field" in condition) {
      return this.evaluateFieldCondition(item, condition);
    }

    if ("and" in condition) {
      return condition.and.every((subCondition) =>
        this.evaluateCondition(item, subCondition)
      );
    }
    
    if ("or" in condition) {
      return condition.or.some((subCondition) =>
        this.evaluateCondition(item, subCondition)
      );
    }

    if ("not" in condition) {
      return !this.evaluateCondition(item, condition.not);
    }

    return false;
  }

  private evaluateFieldCondition(
    item: T,
    condition: FieldCondition<T>
  ): boolean {
    const fieldValue = item[condition.field];
    const operator = this.operators[condition.operator];

    if (!operator) {
      throw new Error(`Unknown operator: ${condition.operator}`);
    }

    return operator(fieldValue, condition.value);
  }

  private applySorting(
    items: T[],
    orderBy: Array<{ field: keyof T; direction: "asc" | "desc" }>
  ): T[] {
    return [...items].sort((a, b) => {
      for (const { field, direction } of orderBy) {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue !== bValue) {
          const comparison = aValue < bValue ? -1 : 1;
          return direction === "asc" ? comparison : -comparison;
        }
      }
      return 0;
    });
  }
}
