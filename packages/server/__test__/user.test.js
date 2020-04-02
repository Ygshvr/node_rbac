const user = require("../models/User");
const allTestUsers = require("./testData");
process.env.NODE_ENV = 'test';

describe("Reading user data.", () => {
  it("should get all the user in sorted order.", async () => {
    let users = await user.getAllUsers();
    expect(users).toEqual(allTestUsers);
  });
  it("should get the user by Id.", async () => {
    let users = await user.getUserById(allTestUsers[0].id);
    expect(users).toEqual(allTestUsers[0]);
  });
})

describe("User verification test.", () => {
  it("should return User after email and password match.", async () => {
    let response = await user.loginUser(allTestUsers[0].email,allTestUsers[0].password)
    expect(response).toEqual(allTestUsers[0])
  })
  it("should throw error is password is wrong.", async () => {
    let errMessage = ''
    try{
      let response = await user.loginUser(allTestUsers[0].email, "wrongPassword")
    }
    catch(error) {
      errMessage = error.message;
    }
    expect(errMessage).toBe('Username or password is incorrect.')
  })
  it("should throw error is username is wrong.", async () => {
    let errMessage = ''
    try{
      let response = await user.loginUser("wrongEmail", allTestUsers[0].password)
    }
    catch(error) {
      errMessage = error.message;
    }
    expect(errMessage).toBe('Username or password is incorrect.')
  })
})