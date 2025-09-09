import {
  AdvancedFilter,
  CustomOperator,
  FilterCondition,
  IFilter,
  OperatorFunctions,
} from "../models";

export class Filter<T> implements IFilter<T> {
  private operators: OperatorFunctions = {
    eq: (a, b) => a === b,
    not: (a, b) => a !== b,
    gt: (a, b) => a > b,
    gte: (a, b) => a >= b,
    lt: (a, b) => a < b,
    lte: (a, b) => a <= b,
    in: (a, b) => {
      if (Array.isArray(a) && Array.isArray(b)) {
        return a.some((item) => b.includes(item));
      }
      return Array.isArray(a) && a.includes(b);
    },
    nin: (a, b) => {
      if (Array.isArray(a) && Array.isArray(b)) {
        return !a.some((item) => b.includes(item));
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
  
  private customOperators: OperatorFunctions = {};

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

  public registerCustomOperator<K extends keyof T>(
    operator: CustomOperator,
    handler: (fieldValue: K, filterValue: T[K]) => boolean
  ): void {
    if (this.customOperators[operator]) {
      throw new Error(`This operator already exists: ${operator}`);
    }
    this.customOperators[operator] = handler;
  }

  public unregisterCustomOperator(operator: CustomOperator): void {
    if (!this.customOperators[operator]) {
      throw new Error(`Operator not found: ${operator}`);
    }
    delete this.customOperators[operator];
  }

  public getCustomOperators(): string[] {
    return Object.keys(this.customOperators);
  }

  private evaluateCondition(item: T, condition: FilterCondition<T>): boolean {
    if ("field" in condition) {
      const fieldValue = item[condition.field];

      const operatorFn = this.operators[condition.operator];
      if (!operatorFn) {
        throw new Error(`Unknown operator: ${condition.operator}`);
      }

      return operatorFn(fieldValue, condition.value);
    }

    if ("custom" in condition) {
      const { field, operator, value } = condition.custom;
      const fieldValue = item[field];

      const operatorFn = this.customOperators[operator];
      if (!operatorFn) {
        throw new Error(`Unknown custom operator: ${operator}`);
      }

      return operatorFn(fieldValue, value);
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

    return false;
  }

  private applySorting(
    items: T[],
    orderBy: Array<{ field: keyof T; direction: "asc" | "desc" }>
  ): T[] {
    return items.sort((a, b) => {
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
