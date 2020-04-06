import apis from '../src/utils/apis';

describe("Login validation tests", () => {
    it('(1) should not allow empty email.', async () => {
        let email = '';
        let password = 'mypassword';
        let response;
        try {
            await apis.login(email, password)
        } catch (error) {
            response = error.message;
        }
        expect(response).toBe('Email and password are required!');
    })
    it('(2) should not allow empty password.', async () => {
        let email = 'test@gmail.com';
        let password = '';
        let response;
        try {
            await apis.login(email, password)
        } catch (error) {
            response = error.message;
        }
        expect(response).toBe('Email and password are required!');
    })
    it('(3) email format should be correct.', async () => {
        let email = 'test@gmail';
        let password = 'mypassword';
        let response;
        try {
            await apis.login(email, password)
        } catch (error) {
            response = error.message;
        }
        expect(response).toBe('Invalid email address!');
    })
})