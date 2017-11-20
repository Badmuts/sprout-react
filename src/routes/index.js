import React from 'react';
import { 
    Route, 
    Redirect,
    Switch
} from 'react-router-dom';
import App from '../components/App';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
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
    <App>
       <Switch>
            <Route exact path="/auth/login" component={LoginContainer}/>
            <Route exact path="/auth/register" component={RegisterContainer}/>
            <PrivateRoute exact path="/demand" component={AdvertisementListContainer}/>
            <PrivateRoute exact path="/supply" component={AdvertisementListContainer}/>
            <Redirect to="/demand" />
        </Switch> 
    </App>
    
);