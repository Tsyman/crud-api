import { mockReq, mockRes, mockUsers } from './mockData';
import { getUsers } from "../userController";

jest.mock('../../db.ts', () => ({
    users: mockUsers,
}));

describe('GetUsers', () => {
    it('should return all users from db', () => {
        getUsers(mockReq, mockRes);
        expect(mockRes.write).toHaveBeenCalledWith(JSON.stringify(mockUsers));
    });

    it('should set the Content-Type header to "application/json"', () => {
        getUsers(mockReq, mockRes);
        expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    });

    it('should set the Content-Length header correctly', () => {
        getUsers(mockReq, mockRes);
        const responseBodyLength = JSON.stringify(mockUsers).length;
        expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Length', responseBodyLength);
    });

    it('should end the response', () => {
        getUsers(mockReq, mockRes);
        expect(mockRes.end).toHaveBeenCalled();
    });
});