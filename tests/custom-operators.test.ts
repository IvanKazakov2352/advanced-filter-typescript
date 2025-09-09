import { FilterBuilder } from "./../src/modules/filter-builder";
import { Filter } from "../src/modules/filter";
import { ComplexUser, User, complexUsers, mockUsers } from "./mock";

describe("Custom operators", () => {
  let filter: Filter<User>;
  let complexUserFilter: Filter<ComplexUser>;

  beforeEach(() => {
    filter = new Filter<User>();
    complexUserFilter = new Filter<ComplexUser>();
  });

  test("should register custom operator", () => {
    const handler1 = jest.fn((a, b) => a > b);
    const handler2 = jest.fn((a, b) => a < b);
    filter.registerCustomOperator("between", handler1);
    filter.registerCustomOperator("contains", handler2);

    const operators = filter.getCustomOperators();

    expect(operators).toHaveLength(2);
    expect(operators).toEqual(["between", "contains"]);
  });

  test("should unregister custom operator", () => {
    filter.registerCustomOperator("handler1", (a, b) => a === b);
    filter.registerCustomOperator("handler2", (a, b) => a === b);

    expect(filter.getCustomOperators()).toHaveLength(2);
    expect(filter.getCustomOperators()).toEqual(["handler1", "handler2"]);

    filter.unregisterCustomOperator("handler1");
    expect(filter.getCustomOperators()).toHaveLength(1);
    expect(filter.getCustomOperators()).toEqual(["handler2"]);

    filter.unregisterCustomOperator("handler2");
    expect(filter.getCustomOperators()).toHaveLength(0);
    expect(filter.getCustomOperators()).toEqual([]);
  });

  test("should using between operator", () => {
    const betweenHandler = jest.fn((fieldValue, filterValue) => {
      return (
        typeof fieldValue === "number" &&
        fieldValue >= filterValue[0] &&
        fieldValue <= filterValue[1]
      );
    });

    filter.registerCustomOperator("between", betweenHandler);

    const result = filter.filter(mockUsers, {
      where: FilterBuilder.custom("age", "between", [35, 40]),
    });

    expect(result).toHaveLength(2);
    filter.unregisterCustomOperator("between");

    expect(filter.getCustomOperators()).toHaveLength(0);
  });

  test("should using between operator and double condition", () => {
    const betweenHandler = jest.fn((fieldValue, filterValue) => {
      return (
        typeof fieldValue === "number" &&
        fieldValue >= filterValue[0] &&
        fieldValue <= filterValue[1]
      );
    });

    filter.registerCustomOperator("between", betweenHandler);

    const result = filter.filter(mockUsers, {
      where: FilterBuilder.and(
        FilterBuilder.custom("age", "between", [35, 40]),
        FilterBuilder.eq("email", "bob@example.com")
      ),
    });

    expect(result).toHaveLength(1);
    filter.unregisterCustomOperator("between");

    expect(filter.getCustomOperators()).toHaveLength(0);
  });

  test("should using nullSafe operator", () => {
    const nullSafe = jest.fn((_, filterValue) => {
      return filterValue === null || filterValue === undefined;
    });

    filter.registerCustomOperator("nullSafe", nullSafe);

    const usersWithNulls = [
      { ...mockUsers[0], tags: null as any },
      { ...mockUsers[1], tags: undefined as any },
    ];

    const result = filter.filter(usersWithNulls, {
      where: FilterBuilder.custom("tags", "nullSafe", true),
    });

    expect(result).toHaveLength(0);
    filter.unregisterCustomOperator("nullSafe");

    expect(filter.getCustomOperators()).toHaveLength(0);
  });

  test("should work with complex object values", () => {
    complexUserFilter.registerCustomOperator("hasPreference", (fieldValue, filterValue) => {
      const hasPreferences = (obj: any): obj is { preferences: Record<string, string> } => {
        return obj && typeof obj === "object" && "preferences" in obj;
      };

      const isPreferenceFilter = (obj: any): obj is { key: string; value: string } => {
        return (obj && typeof obj === "object" && "key" in obj && "value" in obj);
      };

      if (!hasPreferences(fieldValue) || !isPreferenceFilter(filterValue)) {
        return false;
      }

      return fieldValue.preferences[filterValue.key] === filterValue.value;
    });

    const result = complexUserFilter.filter(complexUsers, {
      where: FilterBuilder.or(
        FilterBuilder.custom("metadata", "hasPreference", { key: "theme", value: "dark" }),
        FilterBuilder.custom("metadata", "hasPreference", { key: "theme", value: "system" })
      ),
    });

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(3);
  });
});
