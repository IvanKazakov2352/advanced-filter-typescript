import { AdvancedFilter, FieldCondition, FilterCondition } from '../models/index';
import { ComparisonOperator, operators } from "../models";

export class LazyFilter<T> {
  private operators: Record<ComparisonOperator, (a: any, b: any) => boolean> = operators

  public *lazyFilter(items: T[], filterConfig: AdvancedFilter<T>): Generator<T> {
    let filteredItems = this.applyWhereCondition(items, filterConfig.where);
    
    if (filterConfig.orderBy && filterConfig.orderBy.length > 0) {
      const sortedItems = this.applySorting(
        [...filteredItems],
        filterConfig.orderBy
      );
      filteredItems = function* () { yield* sortedItems; }();
    }

    let count = 0;
    const limit = filterConfig.limit ?? Infinity;
    const offset = filterConfig.offset ?? 0;

    for (const item of filteredItems) {
      if (count < offset) {
        count++;
        continue;
      }

      if (count - offset >= limit) {
        break;
      }

      yield item;
      count++;
    }
  }

  private *applyWhereCondition(items: T[], condition?: FilterCondition<T>): Generator<T> {
    if (!condition) {
      yield* items;
      return;
    }

    for (const item of items) {
      if (this.evaluateCondition(item, condition)) {
        yield item;
      }
    }
  }

  private evaluateCondition(item: T, condition: FilterCondition<T>): boolean {
    if ('field' in condition) {
      return this.evaluateFieldCondition(item, condition);
    }

    if ('and' in condition) {
      return condition.and.every(subCondition => 
        this.evaluateCondition(item, subCondition)
      );
    }

    if ('or' in condition) {
      return condition.or.some(subCondition => 
        this.evaluateCondition(item, subCondition)
      );
    }

    return false;
  }

  private evaluateFieldCondition(item: T, condition: FieldCondition<T>): boolean {
    const fieldValue = item[condition.field];
    const operator = this.operators[condition.operator];
    
    if (!operator) {
      throw new Error(`Unknown operator: ${condition.operator}`);
    }

    return operator(fieldValue, condition.value);
  }

  private applySorting(items: T[], orderBy: Array<{ field: keyof T; direction: 'asc' | 'desc' }>): T[] {
    return [...items].sort((a, b) => {
      for (const { field, direction } of orderBy) {
        const aValue = a[field];
        const bValue = b[field];
        
        if (aValue !== bValue) {
          const comparison = aValue < bValue ? -1 : 1;
          return direction === 'asc' ? comparison : -comparison;
        }
      }
      return 0;
    });
  }

  public *streamFilter(
    itemGenerator: Generator<T> | T[], 
    filterConfig: AdvancedFilter<T>
  ): Generator<T> {
    const items = Array.isArray(itemGenerator) ? itemGenerator : [...itemGenerator];
    yield* this.lazyFilter(items, filterConfig);
  }

  public *batchFilter(
    items: T[], 
    filterConfig: AdvancedFilter<T>, 
    batchSize: number = 1000
  ): Generator<T> {
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      yield* this.lazyFilter(batch, filterConfig);
    }
  }
}