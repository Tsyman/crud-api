import { mockReq, mockRes, mockUsers } from './mockData';
import { getUserById } from "../controllers/userController";

jest.mock('../db', () => ({
    users: mockUsers,
}));

describe('GetUserByID', () => {
    it('should return user founded by id', () => {
        const id = '2';
        const mockUser = mockUsers.find((user) => user.id === id)
        getUserById(mockReq, mockRes, '2');
        expect(mockRes.write).toHaveBeenCalledWith(JSON.stringify(mockUser));
    });
});