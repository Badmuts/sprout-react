import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderBar from "../components/HeaderBar";
import { FormGroup, Button } from "@blueprintjs/core";
import { 
    Route, 
    Switch,
    Redirect,
    NavLink
} from 'react-router-dom';
import ProfileContainer from "./settings/ProfileContainer";
import CompanyContainer from "./settings/CompanyContainer";

import {fetchAdvertisements} from "../store/Advertisements/actions"

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
                                <li className="pt-tab" role="tab" aria-selected="true"><NavLink to="/settings/profile">Mijn profiel</NavLink></li>
                                <li className="pt-tab" role="tab"><NavLink to="/settings/company">Bedrijf</NavLink></li>
                                <li className="pt-tab" role="tab" aria-disabled="true">Emails</li>
                                <li className="pt-tab" role="tab" aria-disabled="true">Abonnement</li>
                            </ul>
                        </div>
                    </div>
                </HeaderBar>
                <div className="Container">
                    <Switch>
                        <Route exact path={this.props.match.url + '/profile'} component={ProfileContainer} />
                        <Route exact path={this.props.match.url + '/company'} component={CompanyContainer} />
                        <Redirect to="/settings/profile" />
                    </Switch>
                </div>
            </div>
        );
    }
}
