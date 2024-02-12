
import { IncomingMessage, ServerResponse} from 'node:http';
import { v4 } from 'uuid';
import { User, users } from '../db';
import { isUser } from '../helpers';


export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
    const responseBody = JSON.stringify(users);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', responseBody.length);
    res.write(responseBody);
    res.end();
};

export const addUser = (req: IncomingMessage, res: ServerResponse) => {
    let body: string = '';
    req.on('data', chunk => {
        body += chunk.toString();
    })
    req.on('end', () => {
        let user: User;
        try {
            user = JSON.parse(body);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.statusCode = 400;
            res.end('Error parsing JSON');
            return;
        }
        user.id = v4();
        if (isUser(user)) {
            users.push(user);
            const responseBody = JSON.stringify(user);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Length', responseBody.length);
            res.write(responseBody);
            res.end('Wrong data in request');
            return;
        }
        res.statusCode = 400;
        res.end('Request should contain fields: "username", "age", "hobbies"');
    })
};

export const getUserById = (req: IncomingMessage, res: ServerResponse, id: string) => {
    const userById = users.find((user) => user.id === id);
    if (!userById) {
        res.statusCode = 404;
        res.end('Can`t find user with that id');
        return;
    }
    const responseBody = JSON.stringify(userById);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', responseBody.length);
    res.write(responseBody);
    res.end();
};

export const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    const userById = users.find((user) => user.id === id);
    if (!userById) {
        res.statusCode = 404;
        res.end('Can`t find user with that id');
        return;
    }
    let body: string = '';
    let userFromRequest: Partial<User>;
    req.on('data', chunk => {
        body += chunk.toString();
    })
    req.on('end', () => {
        try {
            userFromRequest = JSON.parse(body);
        } catch(error) {
            console.error('Error parsing JSON:', error);
            res.statusCode = 400;
            res.end('Error parsing JSON');
            return;
        }
        const updatedUser = { ...userById, ...userFromRequest };
        if(!isUser(updatedUser)) {
            res.statusCode = 400;
            res.end('Invalid data in body request');
            return;
        }
        const indexOfuserById = users.indexOf(userById);

        users.splice(indexOfuserById, 1);
        users.push(updatedUser);
        const responseBody = JSON.stringify(updatedUser);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', responseBody.length);
        res.write(responseBody);
        res.end('');
    })
    
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    const deletedUser = users.find(user => user.id === id);
    if (!deletedUser) {
        res.statusCode = 404;
        res.end('Can`t find user with that id');
        return;
    }
    const userIndex = users.indexOf(deletedUser);
    users.splice(userIndex, 1);
    res.statusCode = 204;
    res.end();
};