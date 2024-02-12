import { mockReq, mockRes, mockUsers } from './mockData';
import { deleteUser } from "../controllers/userController";

jest.mock('../db.ts', () => ({
    users: mockUsers,
}));

describe('DeleteUserByID', () => {
    it('should have response with code 204 after success deletion', () => {
        const id = '1';
        deleteUser(mockReq, mockRes, id);
        expect(mockRes.statusCode).toBe(204);
    });
});