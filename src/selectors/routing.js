import { createSelector } from 'reselect';

export const getLocation = state => state.getIn(['routing', 'locationBeforeTransitions']);

export const getQuery = createSelector(
    getLocation,
    location => location.get('query'),
);

export const getPathname = createSelector(
    getLocation,
    location => location.get('pathname'),
);

export const getSelectedLanguage = createSelector(
    getQuery,
    query => ( query.get('language') || 'any language' )
)
