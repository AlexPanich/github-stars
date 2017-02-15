import {
    FETCH_TOP_REPOS_REQUEST,
    FETCH_TOP_REPOS_SUCCESS,
    FETCH_TOP_REPOS_FAILURE,
} from '../actions';
import pagination from './pagination';

export default pagination({
    types: [
        FETCH_TOP_REPOS_REQUEST,
        FETCH_TOP_REPOS_SUCCESS,
        FETCH_TOP_REPOS_FAILURE,
    ],
    mapActionToKey: action => action.selectedLanguage,
    mapResultToIds: result => result.get('items'),
    disableCaching: false,
});
