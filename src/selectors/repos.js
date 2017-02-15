import { createSelector } from 'reselect';
import { getSelectedLanguage } from './routing';
import { createPaginationSelector } from '../reducers/pagination';

export const getRepoEntities = state => state.getIn(['entities', 'repos']);

export const getStarredReposPaginationByUser = createPaginationSelector(
    state => state.get('starredByUser')
);

export const getTopReposPagination = createPaginationSelector(
    state => state.get('topRepos')
);

export const getTopReposByLanguage = createSelector(
    getRepoEntities,
    getTopReposPagination,
    (repos, pagination) => pagination.get('ids').map(id => repos.get(id)),
);

export const getStarredReposByUser = createSelector(
    getRepoEntities,
    getStarredReposPaginationByUser,
    (repos, pagination) => pagination.get('ids').map(id => repos.get(id)),
);
