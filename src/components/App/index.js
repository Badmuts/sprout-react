import React, { Component } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarContainer />
        {this.props.children}
      </div>
    );
  }
}