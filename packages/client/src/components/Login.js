import React from "react";
import apis from "../utils/apis";
import { Redirect } from "react-router-dom";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
  async handleSubmit(e) {
    e.preventDefault();
    try {
      response = await apis.login(this.state.email, this.state.password);
      if(response) {
        return <Redirect to='/Home' />
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({error: error.response.data})
    }
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
        <table>
          <tbody>
          <tr>
            <td>
              <lable>
                Email<sup>*</sup>{" "}
              </lable>
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
              <lable>
                Password<sup>*</sup>{" "}
              </lable>
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
