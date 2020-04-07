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
        let data = {
            email,
            password
        }
        let response
        try {
            response = await axios.post(`http://${domain}/api/auth/login`,data , { headers: { 'Content-Type': 'application/json' }});
        }
        catch(error) {
          console.log(error);
          if(error.response)
            throw new Error(error.response.data.message);
          else
            throw new Error('Oops something went wrong, please try after sometime.');
        }
        sessionStorage.setItem('token', response.data.token)
        return true;
    },
    getAllUsers: async() => {
        let token = sessionStorage.getItem('token')
        let response
        try {
            response = await axios.get(`http://${domain}/api/user/getAll`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
        }
        catch(error) {
            console.log(error);
            if(error.response)
                throw new Error(error.response.data.message);
            else
                throw new Error('Oops something went wrong, please try after sometime.');
        }
        return response.data
    },
    getById: async(id) => {
        let token = sessionStorage.getItem('token')
        let response
        try {
            response = await axios.get(`http://${domain}/api/user/${id}`, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
        }
        catch(error) {
            console.log(error);
            if(error.response)
                throw new Error(error.response.data.message);
            else
                throw new Error('Oops something went wrong, please try after sometime.');
        }
        return response.data
    }
}