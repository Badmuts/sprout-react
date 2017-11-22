import React, {Component} from 'react';
import auth from '../store/auth';
import Navbar from '../components/Navbar';
import { Redirect } from 'react-router-dom';

export default class NavbarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { logout: false };
    }

    logout = () => {
        auth.logout();
        this.setState({ logout: true });
    }

    render() {
        const {logout} = this.state;
        if (logout) {
            return (<Redirect to="/auth/login"/>);
        }
        return (<Navbar logout={this.logout}/>);
    }
}