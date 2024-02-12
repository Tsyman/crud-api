import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import { User, users } from '../db';
import { isUser } from '../helpers';

export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  const responseBody = JSON.stringify(users);
  setResponseHeaders(res, responseBody);
  res.end();
};

export const addUser = (req: IncomingMessage, res: ServerResponse) => {
  let requestBody: string = '';

  req.on('data', chunk => {
      requestBody += chunk.toString();
  });

  req.on('end', () => {
    let newUser: User;

    try {
        newUser = JSON.parse(requestBody);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        sendErrorResponse(res, 400, 'Error parsing JSON');
        return;
    }

    newUser.id = uuidv4();

    if (isUser(newUser)) {
      users.push(newUser);
      const responseBody = JSON.stringify(newUser);
      setResponseHeaders(res, responseBody);
      res.end();
      return;
    }

    sendErrorResponse(res, 400, 'Request should contain fields: "username", "age", "hobbies"');
  });
};

export const getUserById = (req: IncomingMessage, res: ServerResponse, id: string) => {
  const foundUser = users.find(user => user.id === id);

  if (!foundUser) {
    sendErrorResponse(res, 404, 'Can\'t find user with that id');
    return;
  }

  const responseBody = JSON.stringify(foundUser);
  setResponseHeaders(res, responseBody);
  res.end();
};

export const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  const foundUser = users.find(user => user.id === id);

  if (!foundUser) {
      sendErrorResponse(res, 404, 'Can\'t find user with that id');
      return;
  }

  let requestBody: string = '';
  let updatedUserFields: Partial<User>;

  req.on('data', chunk => {
      requestBody += chunk.toString();
  });

  req.on('end', () => {
    try {
      updatedUserFields = JSON.parse(requestBody);
    } catch(error) {
      console.error('Error parsing JSON:', error);
      sendErrorResponse(res, 400, 'Error parsing JSON');
      return;
    }

    const updatedUser = { ...foundUser, ...updatedUserFields };

    if (!isUser(updatedUser)) {
      sendErrorResponse(res, 400, 'Invalid data in request body');
      return;
    }

    const userIndex = users.indexOf(foundUser);
    users.splice(userIndex, 1, updatedUser);
    const responseBody = JSON.stringify(updatedUser);
    setResponseHeaders(res, responseBody);
    res.end();
  });
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
    const deletedUser = users.find(user => user.id === id);

    if (!deletedUser) {
      sendErrorResponse(res, 404, 'Can\'t find user with that id');
      return;
    }
    
    const userIndex = users.indexOf(deletedUser);
    users.splice(userIndex, 1);
    res.statusCode = 204;
    res.end();
};

function setResponseHeaders(res: ServerResponse, responseBody: string): void {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(responseBody));
  res.write(responseBody);
}

function sendErrorResponse(res: ServerResponse, statusCode: number, message: string): void {
  res.statusCode = statusCode;
  res.end(message);
}
