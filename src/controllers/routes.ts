import { IncomingMessage, RequestListener, ServerResponse } from 'node:http';
import { addUser, deleteUser, getUserById, getUsers, updateUser } from './userController';

export const routes: RequestListener = (req: IncomingMessage, res: ServerResponse) => {
    try {
      const { url, method } = req;

      if (url === '/api/users') {
        if (method === 'GET') {
          getUsers(req, res);
        } else if (method === 'POST') {
          addUser(req, res);
        } else {
          handleInvalidMethod(res);
        }
      } else if (url?.startsWith('/api/users/')) {
        const userId = extractUserId(url);

        if (!userId) {
          handleInvalidId(res);
          return;
        }

        if (method === 'GET') {
          getUserById(req, res, userId);
        } else if (method === 'PUT') {
          updateUser(req, res, userId);
        } else if (method === 'DELETE') {
          deleteUser(req, res, userId);
        } else {
          handleInvalidMethod(res);
        }
      } else {
        handleNotFound(res);
      }
    } catch (error) {
      console.error(error);
      handleInternalServerError(res);
    }
};

function extractUserId(url: string): string | null {
  const userId = url.slice(11);
  return typeof userId === 'string' ? userId : null;
}

function handleInvalidMethod(res: ServerResponse): void {
  res.statusCode = 405;
  res.end('Method Not Allowed');
}

function handleInvalidId(res: ServerResponse): void {
  res.statusCode = 400;
  res.end('Invalid User ID');
}

function handleNotFound(res: ServerResponse): void {
  res.statusCode = 404;
  res.end('Not Found');
}

function handleInternalServerError(res: ServerResponse): void {
  res.statusCode = 500;
  res.end('Internal Server Error');
}
