import React, { Component } from 'react';
import { Button, AnchorButton, Intent } from '@blueprintjs/core';
import '../App/App.css';
import './HeaderBar.css';

export default class HeaderBar extends Component {
    render() {
        return (
            <div className="HeaderBar">
                <div className="Container">
                    {!this.props.children ? (
                        <div>
                            <div className="HeaderBar-group pt-align-left">
                                <AnchorButton className="pt-large" iconName="plus" intent={Intent.SUCCESS} href="/a/create">Aanbod plaatsen</AnchorButton>
                                <span className="HeaderBar-divider"></span>
                                <div className="pt-input-group pt-large">
                                    <input className="pt-input pt-large" type="text"  id="search" onChange={this.props.onSearch} placeholder="Zoeken..."/>
                                    <span className="pt-icon pt-icon-search"></span>
                                </div>
                            </div>
                            <div className="HeaderBar-group pt-align-right">
                                <span className="HeaderBar-divider"></span>
                                <Button className="pt-large" intent={Intent.PRIMARY}>Zoeken</Button>
                            </div>
                        </div>
                    ) : (this.props.children)}
                </div>
            </div>
        );
    }
}