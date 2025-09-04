import { FilterBuilder } from '../src/modules/filter-builder';
import { Filter } from "../src/modules/filter";
import { User, mockUsers } from "./mock";

describe("Filter", () => {
  let filter: Filter<User>;

  beforeEach(() => {
    filter = new Filter<User>();
  });

  describe('Базовые операторы сравнения', () => {
    test('eq - равно', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.eq('age', 30)
      });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });

    test('ne - не равно', () => {
      const result = filter.filter(mockUsers, {
        where: FilterBuilder.field('age', 'ne', 30)
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
