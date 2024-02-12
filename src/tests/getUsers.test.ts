import { mockReq, mockRes, mockUsers } from './mockData';
import { getUsers } from "../controllers/userController";

jest.mock('../db', () => ({
    users: mockUsers,
}));

describe('GetUsers', () => {
    it('should return all users from db', () => {
        getUsers(mockReq, mockRes);
        expect(mockRes.write).toHaveBeenCalledWith(JSON.stringify(mockUsers));
    });
});