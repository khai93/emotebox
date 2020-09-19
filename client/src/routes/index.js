import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {Home} from "../components/home";
import {Login} from "../components/login";
import {Create} from "../components/create";
import {AuthCheck} from "../components/shared/"

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <AuthCheck component={Home} />
                </Route>
                <Route path="/home">
                    <AuthCheck component={Home} />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/create">
                    <AuthCheck component={Create} />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;