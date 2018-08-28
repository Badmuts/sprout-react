import React, {Component} from 'react';
import { connect } from "react-redux";
import Navbar from '../components/Navbar';
import { logout } from "../store/AuthenticatedUser/actions";

class NavbarContainer extends Component {
    render() {
        return (<Navbar {...this.props} />);
    }
}

const mapStateToProps = state => {
  const { AuthenticatedUser } = state;
  return { user: AuthenticatedUser.user };
};

export default connect(mapStateToProps, {
    logout: logout
})(NavbarContainer);