import { mockReq, mockRes, mockUsers } from './mockData';
import { getUserById } from "../userController";

jest.mock('../../db.ts', () => ({
    users: mockUsers,
}));

describe('GetUserByID', () => {
    it('should return user founded by id', () => {
        const id = '2';
        const mockUser = mockUsers.find((user) => user.id === id)
        getUserById(mockReq, mockRes, '2');
        expect(mockRes.write).toHaveBeenCalledWith(JSON.stringify(mockUser));
    });

    it('should return 404 if user with given id is not found', () => {
        const id = '100';
        getUserById(mockReq, mockRes, id);
        expect(mockRes.statusCode).toBe(404);
    });
    
    it('should return the user with the correct id', () => {
        const id = '3';
        const mockUser = mockUsers.find(user => user.id === id);
        getUserById(mockReq, mockRes, id);
        expect(mockRes.write).toHaveBeenCalledWith(JSON.stringify(mockUser));
    });
});