import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
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
                        <input className="pt-input" type="text" placeholder="Zoeken..."/>
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