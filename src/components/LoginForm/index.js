import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import './LoginForm.css';

export default class LoginForm extends Component {
  render() {
    return (
      <div className="row center-xs middle-xs LoginFormWrapper">
        {/* <div className="col-xs-6">
          <h1>Sprout</h1>
        </div> */}
        <div className="LoginForm col-xs-4">
          <div className="box">
            {this.props.children}
            <form name="login" onSubmit={this.props.onSubmit}>
              <div className="pt-control-group pt-vertical">
                <div className="pt-input-group pt-large">
                  <span class="pt-icon pt-icon-envelope"></span>
                  <input className="pt-input pt-large pt-fill" type="email" name="email" id="email" placeholder="E-mailadres" onChange={this.props.onChange.bind(this, 'email')} required />
                </div>
              
                <div className="pt-input-group pt-large">
                  <span class="pt-icon pt-icon-lock"></span>
                  <input className="pt-input pt-large pt-fill" type="password" name="password" id="password" placeholder="Wachtwoord" onChange={this.props.onChange.bind(this, 'password')} required />
                </div>

                <Button className="pt-fill pt-large" type="submit" intent={Intent.SUCCESS}>{this.props.title}</Button>
                {this.props.showRegister 
                  ? (<Link className="pt-button pt-minimal pt-fill pt-large" to="/auth/register">Register</Link>)
                  : (<Link className="pt-button pt-minimal pt-fill pt-large" to="/auth/login">Login</Link>)}
                  
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
