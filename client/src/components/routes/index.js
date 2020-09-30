import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {Home} from "../scenes/HomeScene/home";
import {Login} from "../scenes/LoginScene/login";
import {Create} from "../scenes/CreateScene/create";
import {AuthCheck} from "../shared"

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