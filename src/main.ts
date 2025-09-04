import { AdvancedFilter, FilterCondition } from './models';
import { Filter, FilterBuilder } from './modules'

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
}

const users: User[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', isActive: true, roles: ['admin', 'user'], createdAt: new Date('2023-01-01') },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', isActive: false, roles: ['user'], createdAt: new Date('2023-02-01') },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', isActive: true, roles: ['moderator'], createdAt: new Date('2023-03-01') },
  { id: 4, name: 'Alice Brown', age: 28, email: 'alice@example.com', isActive: true, roles: ['admin'], createdAt: new Date('2023-04-01') },
];