import React from 'react';
import { Route, Redirect } from 'react-router';

import App from './components/App.jsx';
import UserPage from './containers/UserPage.jsx';
import RepoPage from './containers/RepoPage.jsx';
import TopRepos from './containers/TopRepos.jsx';

export default (
    <Route component={App}>
        <Redirect from="/" to="top" />
        <Route path="/top" component={TopRepos} />
        <Route path="/:login/:repo" component={RepoPage} />
        <Route path="/:login" component={UserPage} />
    </Route>
);
