import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../endpoints/auth';
import { Redirect } from 'react-router-dom';
import auth from '../store/auth';

class LoginContainer extends Component {
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
        login(this.state.email, this.state.password)
            .then(this.setState({loggedIn: auth.isAuthenticated()}))
            .catch(this.setState({errorMessage: 'Oeps! Er ging iets mis. Probeer het opnieuw'}));
    }

    handleOnChange = (propertyName, event) => {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState({state});
    }

    render() {
        const { loggedIn, errorMessage } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        
        if (loggedIn) {
            return (<Redirect to={from} />)
        }

        return (
            <LoginForm 
                onSubmit={this.handleOnSubmit} 
                onChange={this.handleOnChange}>
                {errorMessage && (
                    <div>{errorMessage}</div>
                )}
            </LoginForm>
        );
    }
}

export default LoginContainer;
