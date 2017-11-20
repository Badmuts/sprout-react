import React, { Component } from 'react';
import { FormGroup, Button, Intent } from '@blueprintjs/core';

export default class LoginForm extends Component {
  render() {
    return (
        <div>
          <h1>{this.props.title}</h1>
          {this.props.children}
          <form name="login" onSubmit={this.props.onSubmit}>
            <FormGroup
              label="E-mailadres"
              labelFor="email"
              required={true}
            >
              <input className="pt-input" type="email" name="email" id="email" placeholder="E-mailadres" onChange={this.props.onChange.bind(this, 'email')} required />
            </FormGroup>
            
            <FormGroup
              label="Wachtwoord"
              labelFor="password"
              required={true}
            >
             <input className="pt-input" type="password" name="password" id="password" placeholder="Wachtwoord" onChange={this.props.onChange.bind(this, 'password')} required />
            </FormGroup>
            <Button type="submit" intent={Intent.SUCCESS}>{this.props.title}</Button>
          </form>
        </div>
    );
  }
}
