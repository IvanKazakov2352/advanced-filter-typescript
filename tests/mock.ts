export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
  tags: string[];
}

export interface ComplexUser {
  id: number;
  metadata: { preferences: { theme: string; language: string } };
}

export const complexUsers: ComplexUser[] = [
  { id: 1, metadata: { preferences: { theme: "dark", language: "en" } } },
  { id: 2, metadata: { preferences: { theme: "light", language: "fr" } } },
  { id: 3, metadata: { preferences: { theme: "system", language: "ru" } } },
  { id: 4, metadata: { preferences: { theme: "light", language: "gb" } } },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    isActive: true,
    roles: ["admin", "user"],
    tags: [],
    createdAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    email: "jane@example.com",
    isActive: false,
    roles: ["user"],
    tags: [],
    createdAt: new Date("2023-02-01"),
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 35,
    email: "bob@example.com",
    isActive: true,
    roles: ["moderator"],
    tags: [],
    createdAt: new Date("2023-03-01"),
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 28,
    email: "alice@example.com",
    isActive: true,
    roles: ["admin"],
    tags: [],
    createdAt: new Date("2023-04-01"),
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 40,
    email: "charlie@example.com",
    isActive: false,
    roles: ["user", "guest"],
    tags: [],
    createdAt: new Date("2023-05-01"),
  },
];

export function* generateLargeUserDataset(count: number): Generator<User> {
  for (let i = 0; i < count; i++) {
    yield {
      id: i + 1,
      name: `User ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 18,
      email: `user${i + 1}@example.com`,
      isActive: Math.random() > 0.3,
      tags: [],
      roles: Math.random() > 0.5 ? ["admin", "user"] : ["user"],
      createdAt: new Date(),
    };
  }
}
