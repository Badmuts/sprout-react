import React, { Component } from "react";
import HeaderBar from "../components/HeaderBar";
import { FormGroup, Button } from "@blueprintjs/core";
import { 
    Route, 
    Switch,
    Redirect
} from 'react-router-dom';

import {fetchAdvertisements} from "../store/Advertisements/actions"

const ProfilePanel = () => (
    <div>
        <h4>Mijn profiel</h4>
        <div className="row">
            <form className="col-lg-4">
                <FormGroup
                    label="E-mailadres"
                    labelFor="email"
                    required={true}
                >
                    <input className="pt-input pt-fill" id="email" type="email" placeholder="support@getsprout.nl" required />
                </FormGroup>
                <FormGroup
                    label="Wachtwoord"
                    labelFor="password"
                    required={true}
                >
                    <input className="pt-input pt-fill" id="password" type="password" placeholder="Wachtwoord" required />
                </FormGroup>
                <Button type="submit" className="pt-intent-success">Opslaan</Button>
            </form>
        </div>
    </div>
);

const CompanyPanel = () => (
    <div>
        <h4>Bedrijf</h4>
        <div className="row">
            <form className="col-lg-4">
                <FormGroup
                    label="Bedrijfsnaam"
                    labelFor="name"
                    required={true}
                >
                    <input className="pt-input pt-fill" id="name" type="name" placeholder="Sprout" required />
                </FormGroup>
                <FormGroup
                    label="Adres"
                    labelFor="address"
                    required={true}
                >
                    <input className="pt-input pt-fill" id="address" type="text" placeholder="Straatnaam 12" required />
                </FormGroup>
                <FormGroup
                    label="Postcode"
                    labelFor="zip"
                    required={true}
                >
                    <input className="pt-input pt-fill" id="zip" type="text" placeholder="1234 AA" required />
                </FormGroup>
                <FormGroup
                    label="Plaatsnaam"
                    labelFor="city"
                    required={true}
                >
                    <input className="pt-input pt-fill" id="city" type="text" placeholder="Amsterdam" required />
                </FormGroup>
                <FormGroup
                    label="Land"
                    labelFor="country"
                    required={true}
                >
                    <input className="pt-input pt-fill" id="country" type="text" placeholder="Nederland" required />
                </FormGroup>
                <Button type="submit" className="pt-intent-success">Opslaan</Button>
            </form>
        </div>
    </div>
);

export default class SettingsContainer extends Component {
    render() {
        return (
            <div>
                <HeaderBar>
                    <div className="HeaderBar-group pt-align-left">
                        <h3>Instellingen</h3>
                        <span className="HeaderBar-divider"></span>
                        <div className="pt-tabs">
                            <ul className="pt-tab-list" role="tablist">
                                <li className="pt-tab" role="tab" aria-selected="true">Mijn profiel</li>
                                <li className="pt-tab" role="tab">Bedrijf</li>
                                <li className="pt-tab" role="tab">Emails</li>
                                <li className="pt-tab" role="tab">Abonnement</li>
                            </ul>
                        </div>
                    </div>
                </HeaderBar>
                <div className="Container">
                    <Switch>
                        <Route exact path={this.props.match.url + '/profile'} component={ProfilePanel} />
                        <Route exact path={this.props.match.url + '/company'} component={CompanyPanel} />
                        <Redirect to="/settings/profile" />
                    </Switch>
                </div>
            </div>
        );
    }
}
