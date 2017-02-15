import { createSelector } from 'reselect';

import { createPaginationSelector } from '../reducers/pagination';

export const getUserEntities = state => state.getIn(['entities', 'users']);

export const getStargazersPaginationByRepo = createPaginationSelector(
    state => state.get('stargazersByRepo')
);

// (state, key) => state.get('stargazersByRepo').get(key) || initialState

export const getStargazersByRepoName = createSelector(
    getUserEntities,
    getStargazersPaginationByRepo,
    (users, pagination) => pagination.get('ids').map(id => users.get(id)),
);
