import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {App} from "../components/app";
import {Login} from "../components/login";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;