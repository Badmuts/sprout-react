import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Callout, Intent } from '@blueprintjs/core';
import LoginForm from '../components/LoginForm';
import Login from '../components/Login';
import { login } from "../store/AuthenticatedUser/actions";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    handleOnChange = (propertyName, event) => {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState({state});
    }

    render() {
        const { user, error, loading } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        if (user) {
            return (<Redirect to={from} />)
        }

        return (
            <Login>
                <LoginForm 
                    title="Login"
                    onSubmit={this.handleOnSubmit} 
                    onChange={this.handleOnChange}
                    showRegister={true}
                    loading={loading}>
                    {(error && (
                        <Callout iconName="error" intent={Intent.DANGER}>
                            <h5>Oeps!</h5>
                            {error.message}
                        </Callout>
                    ))}
                </LoginForm>
                {/* <Link className="pt-button pt-minimal pt-fill" to="/auth/register">Register</Link> */}
            </Login>
        );
    }
}

const mapStateToProps = state => {
  const { AuthenticatedUser } = state;
  return AuthenticatedUser;
};

const mapDispatchToProps = {
    login: login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
