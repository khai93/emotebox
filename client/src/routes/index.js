import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {Home} from "../components/home";
import {Login} from "../components/login";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;