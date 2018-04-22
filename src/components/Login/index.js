import React, { Component } from 'react';
import './Login.css';
import '../App/App.css';

export default class Login extends Component {
    render() {
        return (
            <div className="Login">
                <div className="LoginContainer">
                    {this.props.children}
                </div>
            </div>
        )
    }
}