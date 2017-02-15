import {
    FETCH_STARRED_REPOS_REQUEST,
    FETCH_STARRED_REPOS_SUCCESS,
    FETCH_STARRED_REPOS_FAILURE,
} from '../actions';
import pagination from './pagination';

export default pagination({
    types: [
        FETCH_STARRED_REPOS_REQUEST,
        FETCH_STARRED_REPOS_SUCCESS,
        FETCH_STARRED_REPOS_FAILURE,
    ],
    mapActionToKey: action => action.login,
});
