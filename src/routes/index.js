import React from 'react';
import { 
    Route, 
    Redirect,
    Switch
} from 'react-router-dom';
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from '../components/App';
import LoginContainer from '../containers/auth/LoginContainer';
import RegisterContainer from '../containers/auth/RegisterContainer';
import AdvertisementListContainer from '../containers/ads/AdvertisementListContainer';
import AdDetailContainer from '../containers/ads/AdDetailContainer';
import SettingsContainer from '../containers/settings/SettingsContainer';
import CompanyDetailContainer from '../containers/company/CompanyDetailContainer';
import AdCreateContainer from '../containers/ads/AdCreateContainer';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        rest.isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ 
                    pathname: '/auth/login', 
                    state: { from: props.location } 
                }}/>
            )
    )}/>
)

const Routes = (props) => (
<Router>
    <Switch>
        <Route exact path="/auth/login" component={LoginContainer}/>
        <Route exact path="/auth/register" component={RegisterContainer}/>
        <Switch>
            <App>
                <Switch>
                    <PrivateRoute path="/settings" component={SettingsContainer} {...props}/>
                    <PrivateRoute exact path="/a/demand" component={AdvertisementListContainer} {...props}/>
                    <PrivateRoute exact path="/a/supply" component={AdvertisementListContainer} {...props}/>
                    <PrivateRoute exact path="/a/create" component={AdCreateContainer} {...props}/>
                    <PrivateRoute exact path="/a/:id(\d+)" component={AdDetailContainer} {...props}/>
                    <PrivateRoute exact path="/c/:id(\d+)" component={CompanyDetailContainer} {...props}/>
                    <Redirect exact to="/a/supply" />
                </Switch>
            </App>
        </Switch>
    </Switch>
</Router>
);

const mapStateToProps = state => {
  const { AuthenticatedUser } = state;
  return { isAuthenticated: !!AuthenticatedUser.accessToken };
};

export default connect(mapStateToProps)(Routes);