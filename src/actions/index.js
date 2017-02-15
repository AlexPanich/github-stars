import { CALL_API } from '../middleware/api';
import schemas from '../schemas';

import { getStarredReposPaginationByUser, getTopReposPagination } from '../selectors/repos';
import { getStargazersPaginationByRepo } from '../selectors/users';
import { getSelectedLanguage } from '../selectors/routing';

export const ANY  = 'any language';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUser = login => ({
    login,
    [CALL_API]: {
        types: [FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
        endpoint: `/users/${login}`,
        schema: schemas.USER,
    },
});

export const loadUser = login => dispatch => {
    return dispatch(fetchUser(login));
};

export const FETCH_STARRED_REPOS_REQUEST = 'FETCH_STARRED_REPOS_REQUEST';
export const FETCH_STARRED_REPOS_SUCCESS = 'FETCH_STARRED_REPOS_SUCCESS';
export const FETCH_STARRED_REPOS_FAILURE = 'FETCH_STARRED_REPOS_FAILURE';

const fetchStarredRepos = login => ({
    login,
    [CALL_API]: {
        types: [FETCH_STARRED_REPOS_REQUEST, FETCH_STARRED_REPOS_SUCCESS, FETCH_STARRED_REPOS_FAILURE],
        endpoint: `/users/${login}/starred`,
        schema: schemas.REPO_ARRAY,
    },
});

export const loadStarredRepos = login => (dispatch, getState) => {
    const pagination = getStarredReposPaginationByUser(getState(), login);

    if (!pagination.get('ids').isEmpty()) {
        return null;
    }

    return dispatch(fetchStarredRepos(login));
};

export const FETCH_REPO_REQUEST = 'FETCH_REPO_REQUEST';
export const FETCH_REPO_SUCCESS = 'FETCH_REPO_SUCCESS';
export const FETCH_REPO_FAILURE = 'FETCH_REPO_FAILURE';

const fetchRepo = fullName => ({
    fullName,
    [CALL_API]: {
        types: [FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
        endpoint: `/repos/${fullName}`,
        schema: schemas.REPO,
    },
});

export const loadRepo = fullName => dispatch => {
    return dispatch(fetchRepo(fullName));
};

export const FETCH_REPO_STARGAZERS_REQUEST = 'FETCH_REPO_STARGAZERS_REQUEST';
export const FETCH_REPO_STARGAZERS_SUCCESS = 'FETCH_REPO_STARGAZERS_SUCCESS';
export const FETCH_REPO_STARGAZERS_FAILURE = 'FETCH_REPO_STARGAZERS_FAILURE';

const fetchRepoStargazers = fullName => ({
    fullName,
    [CALL_API]: {
        types: [FETCH_REPO_STARGAZERS_REQUEST, FETCH_REPO_STARGAZERS_SUCCESS, FETCH_REPO_STARGAZERS_FAILURE],
        endpoint: `/repos/${fullName}/stargazers`,
        schema: schemas.USER_ARRAY,
    },
});

export const loadRepoStargazers = fullName => (dispatch, getState) => {
    const pagination = getStargazersPaginationByRepo(getState(), fullName);

    if (!pagination.get('ids').isEmpty()) {
        return null;
    }

    return dispatch(fetchRepoStargazers(fullName));
};

export const FETCH_TOP_REPOS_REQUEST = 'FETCH_TOP_REPOS_REQUEST';
export const FETCH_TOP_REPOS_SUCCESS = 'FETCH_TOP_REPOS_SUCCESS';
export const FETCH_TOP_REPOS_FAILURE = 'FETCH_TOP_REPOS_FAILURE';

const fetchTopRepos = (pageUrl, selectedLanguage) => {
    const queryLanguage = selectedLanguage && selectedLanguage !== ANY
        ? `+language:${selectedLanguage}`
        : '';

    return {
        selectedLanguage,
        [CALL_API]: {
            types: [FETCH_TOP_REPOS_REQUEST, FETCH_TOP_REPOS_SUCCESS, FETCH_TOP_REPOS_FAILURE],
            endpoint: pageUrl || `/search/repositories?q=stars:>1${queryLanguage}&sort=stars`,
            schema: { items: schemas.REPO_ARRAY },
        },
    }
};

export const loadTopRepos = (nextPage) => (dispatch, getState) => {
    const selectedLanguage = getSelectedLanguage(getState());

    const pagination = getTopReposPagination(getState(), selectedLanguage);

    if (!pagination.get('ids').isEmpty() && !nextPage) {
        return null;
    }

    return dispatch(fetchTopRepos(pagination.get('nextPageUrl'), selectedLanguage));
};
