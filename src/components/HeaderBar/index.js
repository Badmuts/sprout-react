import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import '../App/App.css';
import './HeaderBar.css';

export default class HeaderBar extends Component {
    render() {
        return (
            <div className="HeaderBar">
                <div className="Container">
                    <div className="HeaderBar-group pt-align-left">
                        <Button className="pt-large" iconName="plus" intent={Intent.SUCCESS}>Aanbod plaatsen</Button>
                        <span className="HeaderBar-divider"></span>
                        <FormGroup label="Trefwoord" labelFor="search">
                            <div className="pt-input-group">
                                <input className="pt-input" type="text"  id="search" placeholder="Zoeken..."/>
                                <span className="pt-icon pt-icon-search"></span>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="HeaderBar-group pt-align-right">
                        <span className="HeaderBar-divider"></span>
                        <Button className="pt-large" intent={Intent.PRIMARY}>Zoeken</Button>
                    </div>
                </div>
            </div>
        );
    }
}