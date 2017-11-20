import React from 'react';
import { 
    Route, 
    Redirect,
    Switch
} from 'react-router-dom';
import App from '../components/App';
import LoginContainer from '../containers/LoginContainer';
import AdvertisementListContainer from '../containers/AdvertisementListContainer';
import auth from '../store/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ 
                    pathname: '/auth/login', 
                    state: { from: props.location } 
                }}/>
            )
    )}/>
);

export default (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/auth/login" component={LoginContainer}/>
        <Route exact path="/register" component={App}/>
        <PrivateRoute exact path="/advertisements" component={AdvertisementListContainer}/>
        <Redirect to="/advertisements" />
    </Switch>
);