import React, { Component } from 'react';
import Navbar from '../Navbar';
import HeaderBar from '../HeaderBar';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <HeaderBar />
        {this.props.children}
      </div>
    );
  }
}