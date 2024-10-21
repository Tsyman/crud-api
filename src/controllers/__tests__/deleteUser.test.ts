import { mockReq, mockRes, mockUsers } from './mockData';
import { deleteUser } from "../userController";

jest.mock('../../db.ts', () => ({
    users: mockUsers,
}));

describe('DeleteUserByID', () => {
    it('should have response with code 204 after success deletion', () => {
        const id = '1';
        deleteUser(mockReq, mockRes, id);
        expect(mockRes.statusCode).toBe(204);
    });

    it('should return 404 if user to delete is not found', () => {
        const id = '100';
        deleteUser(mockReq, mockRes, id);
        expect(mockRes.statusCode).toBe(404);
    });
    
    it('should remove the user from the database on successful deletion', () => {
        const id = '2';
        const initialLength = mockUsers.length;
        deleteUser(mockReq, mockRes, id);
        expect(mockUsers.length).toBe(initialLength - 1);
        expect(mockUsers.some(user => user.id === id)).toBe(false);
    });
    
});