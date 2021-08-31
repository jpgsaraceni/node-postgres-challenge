import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import Purchases from '../pages/Purchases';
// import RecoverPassword from '../pages/RecoverPassword';
// import RedefinePassword from '../pages/RedefinePassword';
import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact to="/login" from="/" />
                <PublicRoute restricted={true} path="/login" component={LogIn} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/purchases" component={Purchases} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
