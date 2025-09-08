# Advanced TypeScript Object Filter

A powerful, type-safe filtering library for JavaScript/TypeScript objects with support for complex conditions

## Features

- 🚀 **Type-safe filtering** with full TypeScript support
- 🔍 **Advanced conditions** with `AND`, `OR` operators
- 📊 **Multiple comparison operators**: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`, `like`, `ilike`
- 📝 **Sorting and pagination** capabilities
- 🔧 **Extensible architecture** for custom operators

## Installation

```bash
npm install advanced-filter-typescript
# or
yarn add advanced-filter-typescript
# or
bun add advanced-filter-typescript
```

## Run tests

```bash
npm run test
# or
yarn run test
# or
bun test
```

## Usage
```typescript
export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
}

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', isActive: true, roles: ['admin', 'user'], createdAt: new Date('2023-01-01') },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', isActive: false, roles: ['user'], createdAt: new Date('2023-02-01') },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', isActive: true, roles: ['moderator'], createdAt: new Date('2023-03-01') },
  { id: 4, name: 'Alice Brown', age: 28, email: 'alice@example.com', isActive: true, roles: ['admin'], createdAt: new Date('2023-04-01') },
  { id: 5, name: 'Charlie Wilson', age: 40, email: 'charlie@example.com', isActive: false, roles: ['user', 'guest'], createdAt: new Date('2023-05-01') }
];
```

```typescript
// Example 1
const filter = new Filter<User>();

const result = filter.filter(mockUsers, {
  where: FilterBuilder.field('age', 'not', 30)
});

console.log(result)
```

```typescript
// Example 2
const filter = new Filter<User>();

const result = filter.filter(mockUsers, {
  where: FilterBuilder.field('age', 'gte', 30)
});

console.log(result)
```

```typescript
// Example 3
const filter = new Filter<User>();

const result = filter.filter(mockUsers, {
  where: FilterBuilder.field('roles', 'in', ['admin']),
  orderBy: [
    { field: 'age', direction: 'desc' },
    { field: 'name', direction: 'asc' }
  ],
  offset: 2
});

console.log(result)
```

```typescript
// Example 4
const filter = new Filter<User>();

const result = filter.filter(mockUsers, {
  where: FilterBuilder.and(
    FilterBuilder.field('age', 'gte', 30),
    FilterBuilder.field('isActive', 'eq', true)
  ),
  orderBy: [{ field: 'age', direction: 'asc' }],
  limit: 2
});

console.log(result)
```