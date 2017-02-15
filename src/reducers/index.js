import { combineReducers } from 'redux-immutable';

import routing from './routing';
import entities from './entities';
import starredByUser from './starredByUser';
import stargazersByRepo from './stargazersByRepo';
import topRepos from './topRepos';

export default combineReducers({
    routing,
    entities,
    starredByUser,
    stargazersByRepo,
    topRepos,
});
