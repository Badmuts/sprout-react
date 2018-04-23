import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginForm from '../components/LoginForm';
import { register } from '../store/AuthenticatedUser/actions';
import { Redirect } from 'react-router-dom';
import { Callout, Intent } from '@blueprintjs/core';
import Login from '../components/Login';

class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.register(this.state.email, this.state.password);
    }

    handleOnChange = (propertyName, event) => {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState({state});
    }

    render() {
        const { accessToken, error } = this.props;
        
        if (accessToken) {
            return (<Redirect to="/" />)
        }

        return (
            <Login>
                <LoginForm 
                    title="Register"
                    onSubmit={this.handleOnSubmit} 
                    onChange={this.handleOnChange}
                    showRegister={false}>
                    {error && (
                        <Callout iconName="error" intent={Intent.DANGER}>
                            <h5>Oeps!</h5>
                            {error.message}
                        </Callout>
                    )}
                </LoginForm>
            </Login>
        );
    }
}

const mapStateToProps = state => {
  const { AuthenticatedUser } = state;
  return AuthenticatedUser;
};

const mapDispatchToProps = {
    register: register
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);