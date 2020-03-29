const user = require("../models/User");

describe('Get and set user', () => {
    let myUser = {
        firstName: "Yogeshwar",
        lastName: "Singh",
        userId: "ysthecool"
    }
    it('should create user successfully.', async () => {
        userData = await user.createUser(myUser);
        expect(userData.userId).toBe(myUser.userId);
    })

    it('should get user by userId', async () => {
        userData = await user.getUserById(myUser.userId)
        expect(userData.firstName).toBe(myUser.firstName);
    })
})