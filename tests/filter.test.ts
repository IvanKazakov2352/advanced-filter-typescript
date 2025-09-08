import { FilterBuilder } from '../src/modules/filter-builder';
import { Filter } from "../src/modules/filter";
import { User, mockUsers } from "./mock";

describe("Filter", () => {
  let filter: Filter<User>;

  beforeEach(() => {
    filter = new Filter<User>();
  });

  describe('methods', () => {
    test("filter method exists", () => {
      expect(filter.filter).toBeDefined();
      expect(typeof filter.filter).toBe("function");
    });

    test("eq method exists", () => {
      expect(FilterBuilder.eq).toBeDefined();
      expect(typeof FilterBuilder.eq).toBe("function");
    });

    test("not method exists", () => {
      expect(FilterBuilder.not).toBeDefined();
      expect(typeof FilterBuilder.not).toBe("function");
    });

    test("and method exists", () => {
      expect(FilterBuilder.and).toBeDefined();
      expect(typeof FilterBuilder.and).toBe("function");
    });

    test("field method exists", () => {
      expect(FilterBuilder.field).toBeDefined();
      expect(typeof FilterBuilder.field).toBe("function");
    });

    test("gt method exists", () => {
      expect(FilterBuilder.gt).toBeDefined();
      expect(typeof FilterBuilder.gt).toBe("function");
    });

    test("gte method exists", () => {
      expect(FilterBuilder.gte).toBeDefined();
      expect(typeof FilterBuilder.gte).toBe("function");
    });

    test("ilike method exists", () => {
      expect(FilterBuilder.ilike).toBeDefined();
      expect(typeof FilterBuilder.ilike).toBe("function");
    });

    test("in method exists", () => {
      expect(FilterBuilder.in).toBeDefined();
      expect(typeof FilterBuilder.in).toBe("function");
    });

    test("like method exists", () => {
      expect(FilterBuilder.like).toBeDefined();
      expect(typeof FilterBuilder.like).toBe("function");
    });

    test("lt method exists", () => {
      expect(FilterBuilder.lt).toBeDefined();
      expect(typeof FilterBuilder.lt).toBe("function");
    });

    test("lte method exists", () => {
      expect(FilterBuilder.lte).toBeDefined();
      expect(typeof FilterBuilder.lte).toBe("function");
    });

    test("nin method exists", () => {
      expect(FilterBuilder.nin).toBeDefined();
      expect(typeof FilterBuilder.nin).toBe("function");
    });
  })

  describe('Basic Comparison Operators', () => {
    test('eq - equal', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.eq('age', 30)
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });

    test('not - not equal', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'not', 30)
      });

      expect(result).toHaveLength(4);
      expect(result.some(user => user.age === 30)).toBe(false);
    });

    test('gt - more', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'gt', 30)
      });

      expect(result).toHaveLength(2);
      expect(result.every(user => user.age > 30)).toBe(true);
    });

    test('gte - greater than or equal', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'gte', 30)
      });

      expect(result).toHaveLength(3);
      expect(result.every(user => user.age >= 30)).toBe(true);
    });

    test('lt - less', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'lt', 30)
      });

      expect(result).toHaveLength(2);
      expect(result.every(user => user.age < 30)).toBe(true);
    });

    test('lte - less than or equal', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'lte', 30)
      });

      expect(result).toHaveLength(3);
      expect(result.every(user => user.age <= 30)).toBe(true);
    });

    test('in - in an array', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('roles', 'in', ['admin'])
      });

      expect(result).toHaveLength(2);
      expect(result.every(user => user.roles.includes('admin'))).toBe(true);
    });

    test('nin - not in array', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('roles', 'nin', ['admin'])
      });

      expect(result).toHaveLength(3);
      expect(result.every(user => !user.roles.includes('admin'))).toBe(true);
    });

    test('like - similar (case-sensitive)', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('name', 'like', 'John')
      });

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('John Doe');
    });

    test('ilike - similar (case-insensitive)', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('name', 'ilike', 'bob')
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Bob Johnson');
    });
  })

  describe('Logical operations', () => {
    test('and - logical and', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.and(
          FilterBuilder.field('age', 'gte', 30),
          FilterBuilder.field('isActive', 'eq', true)
        )
      });

      expect(result).toHaveLength(2);
      expect(result.every(user => user.age >= 30 && user.isActive)).toBe(true);
    });

    test('or - logical or', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.or(
          FilterBuilder.field('age', 'lt', 30),
          FilterBuilder.field('isActive', 'eq', false)
        )
      });

      expect(result).toHaveLength(3);
      expect(result.some(user => user.age < 30 || !user.isActive)).toBe(true);
    });
  });

  describe('Sorting', () => {
    test('Sorting by one field (asc)', () => {
      const result = filter.filter(mockUsers, {
        orderBy: [{ field: 'age', direction: 'asc' }]
      });

      expect(result[0].age).toBe(25);
      expect(result[1].age).toBe(28);
      expect(result[4].age).toBe(40);
    });

    test('Sorting by one field (desc)', () => {
      const result = filter.filter(mockUsers, {
        orderBy: [{ field: 'age', direction: 'desc' }]
      });

      expect(result[0].age).toBe(40);
      expect(result[1].age).toBe(35);
      expect(result[4].age).toBe(25);
    });

    test('Sorting by multiple fields', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('isActive', 'eq', true),
        orderBy: [
          { field: 'age', direction: 'desc' },
          { field: 'name', direction: 'asc' }
        ]
      });

      expect(result[0].name).toBe('Bob Johnson');
      expect(result[1].name).toBe('John Doe');
      expect(result[2].name).toBe('Alice Brown');
    });
  });

  describe('Pagination', () => {
    test('Limit - quantity limitation', () => {
      const result = filter.filter(mockUsers, {
        orderBy: [{ field: 'id', direction: 'asc' }],
        limit: 2
      });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    test('Offset - skipping elements', () => {
      const result = filter.filter(mockUsers, {
        orderBy: [{ field: 'id', direction: 'asc' }],
        offset: 2
      });

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe(3);
      expect(result[2].id).toBe(5);
    });

    test('Limit + Offset - pagination', () => {
      const result = filter.filter(mockUsers, {
        orderBy: [{ field: 'id', direction: 'asc' }],
        limit: 2,
        offset: 1
      });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(2);
      expect(result[1].id).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    test('Empty array on input', () => {
      const result = filter.filter([], {
        where: FilterBuilder.eq('age', 30)
      });

      expect(result).toHaveLength(0);
    });

    test('Dates are compared correctly', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('createdAt', 'gt', new Date('2023-02-01'))
      });

      expect(result).toHaveLength(3);
      expect(result.every(user => user.createdAt > new Date('2023-02-01'))).toBe(true);
    });
  });
});
