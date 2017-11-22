import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { register } from '../endpoints/auth';
import { Redirect } from 'react-router-dom';
import auth from '../store/auth';
import { Callout, Intent } from '@blueprintjs/core';
import Login from '../components/Login';

export default class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: auth.isAuthenticated(),
            errorMessage: ''
        };
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        register(this.state.email, this.state.password)
            .then(this.setState({loggedIn: true}))
            .catch(this.setState({errorMessage: 'Oeps! Er ging iets mis. Probeer het opnieuw'}));
    }

    handleOnChange = (propertyName, event) => {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState({state});
    }

    render() {
        const { loggedIn, errorMessage } = this.state;
        
        if (loggedIn) {
            return (<Redirect to="/auth/login" />)
        }

        return (
            <Login>
                <LoginForm 
                    title="Register"
                    onSubmit={this.handleOnSubmit} 
                    onChange={this.handleOnChange}
                    showRegister={false}>
                    {errorMessage && (
                        <Callout iconName="error" intent={Intent.DANGER}>
                            <h5>Oeps!</h5>
                            {errorMessage}
                        </Callout>
                    )}
                </LoginForm>
            </Login>
        );
    }
}
