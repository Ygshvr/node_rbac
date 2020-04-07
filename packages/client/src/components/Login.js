import React from "react";
import apis from "../utils/apis";
import { Redirect } from "react-router-dom";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "Fred@123.com",
      password: "68651",
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    apis.login(this.state.email, this.state.password)
    .then((response) => {
      if(response) {
        this.setState({loggedIn: true})
      }
    })
    .catch((error) =>{
      console.log(error);
      this.setState({error: error.message})
    })
  }
  render() {
    return (<div>
      <h3>login page:</h3>
      <form onSubmit={this.handleSubmit}>
        {this.state.error ? (
          <div id="error">{this.state.error}</div>
        ) : (
          ""
        )}
        {this.state.loggedIn ? <Redirect to='/home'/> :''}
        <table>
          <tbody>
          <tr>
            <td>
                Email<sup>*</sup>{" "}
            </td>
            <td>
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
                Password<sup>*</sup>{" "}
            </td>
            <td>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              ></input>
            </td>
          </tr>
          </tbody>
        </table>
        <input type="submit" />
      </form>
    </div>);
  }
}

export default Login;
