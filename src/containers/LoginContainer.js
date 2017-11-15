import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../store/api';
import { Redirect } from 'react-router-dom';
import auth from '../store/auth';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: auth.isAuthenticated()
        };
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        login(this.state.email, this.state.password)
            .then((response) => this.setState({loggedIn: auth.isAuthenticated()}))
            .catch((err) => console.error('Oops', err));
    }

    handleOnChange = (propertyName, event) => {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState({state});
    }

    render() {
        const { loggedIn } = this.state;
        
        if (loggedIn) {
            return (<Redirect to="/auth" />)
        }

        return (
            <LoginForm onSubmit={this.handleOnSubmit} onChange={this.handleOnChange} />
        );
    }
}

export default LoginContainer;
