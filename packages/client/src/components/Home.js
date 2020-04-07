import React from "react";
import apis from "../utils/apis";

class Home extends React.Component {
    constructor(props) {
       super(props)
       this.header = ['id', 'name', 'email', 'role']
       this.state = {
          users: [
          ]
       }
    }
 
    renderTableHeader() {
       return this.header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
 
    renderTableData() {
       return this.state.users.map((user, index) => {
          const { id, name, email, role } = user
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
             </tr>
          )
       })
    }
   parseJwt (token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
   };
   getUsersByRole(jwtPayload) {
         if(jwtPayload.role === 'EMPLOYEE')
            return apis.getById(jwtPayload.id);
         return apis.getAllUsers();
   }
   componentDidMount() {
      let token = sessionStorage.getItem('token');
      let payload = this.parseJwt(token);
      this.getUsersByRole(payload)
      .then((userData) => {
         console.log(userData)
         this.setState({users: userData})
      })
   }
    render() {
       return (
          <div>
             <table id='users'>
                <tbody>
                   <tr>{this.renderTableHeader()}</tr>
                   {this.renderTableData()}
                </tbody>
             </table>
          </div>
       )
    }
 }

 export default Home