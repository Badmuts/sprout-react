import React from 'react';
import { 
    Route, 
    Redirect,
    Switch
} from 'react-router-dom';
import App from '../components/App';
import Login from '../components/Login';
import Auth from '../components/Auth';
import auth from '../store/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ pathname: '/login' }}/>
            )
    )}/>
);

export default (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={App}/>
        <PrivateRoute exact path="/auth" component={Auth}/>
    </Switch>
);