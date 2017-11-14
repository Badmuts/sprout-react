import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../store/api';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        login(this.state.email, this.state.password)
            .then((response) => console.log('Done', response))
            .catch((err) => console.error('Oops', err));
    }

    handleOnChange = (propertyName, event) => {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState({state});
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleOnSubmit} onChange={this.handleOnChange} />
        );
    }
}

export default LoginContainer;
