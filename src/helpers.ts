import { User } from "./db";

export const isUser = (data: any): data is User => {
    if (!data || typeof data !== 'object') {
        return false;
    }

    const { username, age, hobbies } = data;
    return typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies);
};