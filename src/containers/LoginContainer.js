import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../endpoints/auth';
import { Redirect } from 'react-router-dom';
import auth from '../store/auth';
import { Callout, Intent } from '@blueprintjs/core';
import Login from '../components/Login';

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
            .catch(this.setState({errorMessage: 'Er ging iets mis. Probeer het opnieuw'}));
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
            <Login>
                <LoginForm 
                    title="Login"
                    onSubmit={this.handleOnSubmit} 
                    onChange={this.handleOnChange}
                    showRegister={true}>
                    {errorMessage && (
                        <Callout iconName="error" intent={Intent.DANGER}>
                            <h5>Oeps!</h5>
                            {errorMessage}
                        </Callout>
                    )}
                </LoginForm>
                {/* <Link className="pt-button pt-minimal pt-fill" to="/auth/register">Register</Link> */}
            </Login>
        );
    }
}

export default LoginContainer;
