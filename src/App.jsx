import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, match, useRouteMatch
} from "react-router-dom";
import Quests from "./Quests/Quests";
import Searchers from "./Searchers/Searchers";
import EditSearcher from "./EditSearcher/EditSearcher";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path={"/"} exact>
                    <Quests />
                </Route>
                <Route path={"/crew"}>
                    <Searchers />
                </Route>
                <Route path={"/edit_searcher"}>
                    <EditSearcher />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
