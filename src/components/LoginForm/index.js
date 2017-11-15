import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    return (
        <div>
          <h1>Login</h1>
          {this.props.children}
          <form name="login" onSubmit={this.props.onSubmit}>
            <input type="email" name="email" placeholder="E-mailadres" onChange={this.props.onChange.bind(this, 'email')} required />
            <input type="password" name="password" placeholder="Wachtwoord" onChange={this.props.onChange.bind(this, 'password')} required />
            <button type="submit">Login</button>
          </form>
        </div>
    );
  }
}

export default LoginForm;
