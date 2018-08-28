import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormGroup, Button, Callout, Intent } from "@blueprintjs/core";
import pickBy from "lodash/pickBy";
import merge from "lodash/merge";
import { updateUser } from "./../../store/Users/actions"

class ProfileContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
        isSaving: PropTypes.bool.isRequired,
        error: PropTypes.object
    };

    constructor(props) {
        super(props)
        this.state = {
            email: props.user.email,
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.props.user, pickBy(this.state))
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { email, password } = this.state;

        return (
            <div>
                <div className="pt-card">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3>Mijn profiel</h3>
                            <p>Dit zijn de inloggegevens die je gebruikt voor de website. Je kunt hier je e-mailadres of wachtwoord wijzigen.</p>
                            <p>Zorg altijd voor een sterk wachtwoord. De lengte van een wachtwoord is erg belangrijk.</p>
                        </div>
                        <div className="col-lg-8">
                            {(this.props.error && (
                                <Callout iconName="error" intent={Intent.DANGER}>
                                    <h5>Oeps!</h5>
                                    {this.props.error.message}
                                </Callout>
                            ))}
                            <form onSubmit={this.onSubmit}>
                                <FormGroup
                                    label="E-mailadres"
                                    labelFor="email"
                                    required={true}
                                >
                                    <input className="pt-input pt-fill pt-large" id="email" type="email" placeholder="support@getsprout.nl" value={email} name="email" onChange={this.onChange} required />
                                </FormGroup>
                                <FormGroup
                                    label="Wachtwoord"
                                    labelFor="password"
                                >
                                    <input className="pt-input pt-fill pt-large" id="password" type="password" placeholder="Wachtwoord" value={password} name="password" onChange={this.onChange} />
                                </FormGroup>
                                <Button type="submit" className="pt-intent-success pt-large" loading={this.props.isSaving}>Opslaan</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.AuthenticatedUser.user, isSaving: state.Users.isSaving, error: state.Users.error }),
    dispatch => ({
        onSubmit: (user, updatedFields) => dispatch(updateUser(merge(user, updatedFields)))
    })
)(ProfileContainer)
