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

  describe('Базовые операторы сравнения', () => {
    test('eq - равно', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.eq('age', 30)
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });

    test('not - не равно', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'not', 30)
      });

      expect(result).toHaveLength(4);
      expect(result.some(user => user.age === 30)).toBe(false);
    });

    test('gt - больше', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'gt', 30)
      });

      expect(result).toHaveLength(2);
      expect(result.every(user => user.age > 30)).toBe(true);
    });

    test('gte - больше или равно', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'gte', 30)
      });

      expect(result).toHaveLength(3);
      expect(result.every(user => user.age >= 30)).toBe(true);
    });

    test('lt - меньше', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'lt', 30)
      });

      expect(result).toHaveLength(2);
      expect(result.every(user => user.age < 30)).toBe(true);
    });

    test('lte - меньше или равно', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'lte', 30)
      });

      expect(result).toHaveLength(3);
      expect(result.every(user => user.age <= 30)).toBe(true);
    });

    test('in - в массиве', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('roles', 'in', 'admin')
      });

      expect(result).toHaveLength(2);
      expect(result.every(user => user.roles.includes('admin'))).toBe(true);
    });

    test('nin - не в массиве', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('roles', 'nin', 'admin')
      });

      expect(result).toHaveLength(3);
      expect(result.every(user => !user.roles.includes('admin'))).toBe(true);
    });

    test('like - похоже (регистрозависимый)', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('name', 'like', 'John')
      });

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('John Doe');
    });

    test('ilike - похоже (регистронезависимый)', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('name', 'ilike', 'bob')
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Bob Johnson');
    });
  })
});
