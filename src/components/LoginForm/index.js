import React, { Component } from 'react';
import { Button, Intent, Checkbox } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import './LoginForm.css';
// import unsplash from './../Login/unsplash_2.jpg';

export default class LoginForm extends Component {
  render() {
    return (
      <div className="row center-xs middle-xs LoginFormWrapper">
        <div className="LoginForm col-xs">
          <div className="row">
            <div className="col-xs-4 center-xs">
              <div className="row">
                <div className="col-xs-8 col-xs-offset-2 Title">
                    <span className="fa fa-leaf fa-2x"></span>
                    <h1>Sprout</h1>
                </div>
                <div className="col-xs-10 col-xs-offset-1" style={{textAlign: 'left'}}>
                  {this.props.children}
                </div>
                <div className="col-xs-8 top-xs col-xs-offset-2">
                  <form name="login" onSubmit={this.props.onSubmit}>
                    <div className="pt-control-group pt-vertical">
                      <div className="pt-input-group pt-large">
                        <span className="pt-icon pt-icon-envelope"></span>
                        <input className="pt-input pt-large pt-fill" type="email" name="email" id="email" placeholder="E-mailadres" onChange={this.props.onChange.bind(this, 'email')} required autoFocus tabIndex="1" />
                      </div>
                    
                      <div className="pt-input-group pt-large">
                        <span className="pt-icon pt-icon-lock"></span>
                        <input className="pt-input pt-large pt-fill" type="password" name="password" id="password" placeholder="Wachtwoord" onChange={this.props.onChange.bind(this, 'password')} required tabIndex="2" />
                      </div>
                    </div>

                    {this.props.showRegister
                      ? (<div className="pt-control-group"><Checkbox checked={false} label="Onthoud mij" tabIndex="3"/></div>)
                      : null}

                    <div className="LoginFormFooter">
                      <Button className="pt-large" type="submit" intent={Intent.SUCCESS} tabIndex="4" loading={this.props.loading}>{this.props.title}</Button>
                      {this.props.showRegister 
                        ? (<Link className="pt-button pt-minimal pt-large" to="/auth/register">Registreren</Link>)
                        : (<Link className="pt-button pt-minimal pt-large" to="/auth/login">Ik heb al een account</Link>)}
                    </div>

                    <div className="pt-control-group">
                      {/*<Checkbox checked={false} label="Onthoud mij" />*/}
                      <Link to="/">Wachtwoord vergeten</Link>
                    </div>

                    <p className="LoginFormTerms">Lorem ipsum <a href="#/priv">consectetur</a> adipiscing nec <a href="#/priv">fringilla</a> mauris Aliquam.</p>

                  </form>
                </div>
              </div>
            </div>
            <div className="col-xs-8 Splash">
              <img alt="unsplash" src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-0.3.5&s=8278fe93410d7e608c155625330a886a&auto=format&fit=crop&w=4500&q=80"/>
              <div className="SplashContent">
                <h1>Hello there <span role="img" aria-label="wave">👋</span></h1>
                <p style={{color: 'white'}}>Lorem ipsum consectetur adipiscing nec fringilla mauris Aliquam.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
