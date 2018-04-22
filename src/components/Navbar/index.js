import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Popover, Menu, MenuItem, Position, MenuDivider } from '@blueprintjs/core';
import '../App/App.css';
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="pt-navbar Navbar">
                <div className="Container">
                    <div className="pt-navbar-group pt-align-left">
                        <div className="pt-navbar-heading"><span className="fa fa-fw fa-leaf" /> Sprout</div>
                        <NavLink 
                            className="pt-button pt-minimal" 
                            to="/supply"
                            activeClassName="pt-active">Aanbod</NavLink>
                        <NavLink 
                            className="pt-button pt-minimal" 
                            to="/demand"
                            activeClassName="pt-active">Vraag</NavLink>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <span className="pt-navbar-divider"></span>
                        <Popover content={this.renderUserMenu()} position={Position.BOTTOM_RIGHT}>
                            <Button className="pt-button pt-minimal pt-icon-user"></Button>
                        </Popover>
                    </div>
                </div>
          </nav>
        )
    }

    renderUserMenu() {
        return (
            <Menu>
                <MenuDivider title={this.props.user && this.props.user.email}/>
                <MenuItem
                    iconName="log-out"
                    onClick={this.props.logout}
                    text="Uitloggen"
                />
            </Menu>
        )
    }
}