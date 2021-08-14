import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, match, useRouteMatch
} from "react-router-dom";
import Quests from "./Quests/Quests";
import Searchers from "./Searchers/Searchers";
import AddSearcher from "./EditSearcher/AddSearcher";
import EditSearcher from "./EditSearcher/EditSearcher";

const App = () => {
    const [searcherData, setSearcherData] = useState({})

    return (
        <Router>
            <Switch>
                <Route path={"/"} exact>
                    <Quests />
                </Route>
                <Route exact path={"/crew"}>
                    <Searchers setSearcherData={setSearcherData} />
                </Route>
                <Route exact path={"/add_searcher"}>
                    <AddSearcher />
                </Route>
                <Route exact path={"/edit_searcher"}>
                    <EditSearcher searcherData={searcherData} setSearcherData={searcherData} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
