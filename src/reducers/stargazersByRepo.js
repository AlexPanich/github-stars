import {
    FETCH_REPO_STARGAZERS_REQUEST,
    FETCH_REPO_STARGAZERS_SUCCESS,
    FETCH_REPO_STARGAZERS_FAILURE,
} from '../actions';
import pagination from './pagination';

export default pagination({
    types: [
        FETCH_REPO_STARGAZERS_REQUEST,
        FETCH_REPO_STARGAZERS_SUCCESS,
        FETCH_REPO_STARGAZERS_FAILURE,
    ],
    mapActionToKey: action => action.fullName,
});
