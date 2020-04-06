import axios from 'axios'

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
const domain = 'localhost:4000';

export default {
    login: async (email, password) => {
        if(!email || !password)
            throw new Error('Email and password are required!');
        if(!validateEmail(email))
            throw new Error('Invalid email address!');
        let response = await axios.post(`http://${domain}/api/auth/login`, { headers: { 'Content-Type': 'application/json' }});
        sessionStorage.setItem('token', response.token)
        return true;
    },
    getAllUsers: async() => {
        let token = sessionStorage.getItem('token')
        return await axios.get(`http://${domain}/api/user/getAll`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
    },
    getById: async(id) => {
        let token = sessionStorage.getItem('token')
        return await axios.get(`http://${domain}/api/user/${id}`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
    }
}