import React from 'react';
import { 
    Route, 
    Redirect,
    Switch
} from 'react-router-dom';
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from '../components/App';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import AdvertisementListContainer from '../containers/AdvertisementListContainer';

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
                <PrivateRoute exact path="/demand" component={AdvertisementListContainer} {...props}/>
                <PrivateRoute exact path="/supply" component={AdvertisementListContainer} {...props}/>
                <Redirect to="/demand" />
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