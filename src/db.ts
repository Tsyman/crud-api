import { v4 } from 'uuid';

export interface User {
    id?: string;
    username: string;
    age: number;
    hobbies:string[]
};

export const users: User[] = [
    {
      id: v4(),
      username: 'Maksim',
      age: 22,
      hobbies:['football', 'coding']
    }, 
    {
      id: v4(),
      username: 'Alexey',
      age: 22,
      hobbies:['volleyball', 'cooking']
    },
];