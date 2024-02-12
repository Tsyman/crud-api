import { IncomingMessage, ServerResponse } from "node:http";

export const mockUsers = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Jane' },
    { id: '3', name: 'Bob' },
];

export const mockReq = { } as IncomingMessage;
export const mockRes = {
    write: jest.fn(),
    end: jest.fn(),
    setHeader: jest.fn(),
} as unknown as ServerResponse;