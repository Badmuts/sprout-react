import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="pt-navbar pt-dark">
          <div className="Container">
            <div className="pt-navbar-group pt-align-left">
              <div className="pt-navbar-heading">Sprout</div>
                <NavLink 
                 className="pt-button pt-minimal" 
                 to="/supply"
                 activeClassName="pt-active">Aanbod</NavLink>
                <NavLink 
                 className="pt-button pt-minimal" 
                 to="/demand"
                 activeClassName="pt-active">Vraag</NavLink>
            </div>
            <div className="pt-navbar-group pt-align-right">
              {/* <span className="pt-navbar-divider"></span>
              <button className="pt-button pt-minimal pt-icon-user"></button> */}
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}