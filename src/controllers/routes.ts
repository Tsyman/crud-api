import { IncomingMessage, RequestListener, ServerResponse } from 'node:http';
import { addUser, deleteUser, getUserById, getUsers, updateUser } from './userController';


export const routes: RequestListener = (req: IncomingMessage, res: ServerResponse) => {
    try {
            const { url, method } = req;
        if(url === '/api/users') {
            if(method === 'GET') {
                getUsers(req, res);
            } else if ( method === 'POST') {
                addUser(req, res);
            }
        } else if (url?.startsWith('/api/users/')) {
            const id = url.slice(11);
            console.log(id);
            if (typeof id !== 'string') {
                res.statusCode = 404;
                res.end('Request should contain correct id');
                return;
              }
            if(method === 'GET') {
                getUserById(req, res, id);
            } else if(method === 'PUT') {
                updateUser(req, res, id);
            } else if(method === 'DELETE') {
                deleteUser(req, res, id);
            }
        } else {
            res.statusCode = 404;
            res.end('Check your request');
        }
    } catch(e) {
        console.log(e)
    }
};