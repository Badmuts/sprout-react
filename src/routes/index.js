import React from 'react';
import { 
    Route, 
    Redirect,
    Switch
} from 'react-router-dom';
import App from '../components/App';
import LoginContainer from '../containers/LoginContainer';
import AdvertisementContainer from '../containers/AdvertisementContainer';
import Auth from '../components/Auth';
import auth from '../store/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ 
                    pathname: '/login', 
                    state: { from: props.location } 
                }}/>
            )
    )}/>
);

export default (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={LoginContainer}/>
        <Route exact path="/register" component={App}/>
        <PrivateRoute exact path="/auth" component={Auth}/>
        <PrivateRoute exact path="/ads" component={AdvertisementContainer}/>
    </Switch>
);