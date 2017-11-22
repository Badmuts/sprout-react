import React, { Component } from 'react';
import NavbarContainer from '../../containers/NavbarContainer';
import HeaderBar from '../HeaderBar';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarContainer />
        <HeaderBar />
        {this.props.children}
      </div>
    );
  }
}