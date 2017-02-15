import { fromJS } from 'immutable';

export const initialState = fromJS({
    isFetching: false,
    pageCount: 0,
    nextPageUrl: null,
    ids: [],
});

export const createPaginationSelector = selector =>
    (state, key) => selector(state).get(key) || initialState;

export default function pagination({ types, mapActionToKey, disableCaching, mapResultToIds = r => r }) {
    if (!disableCaching && typeof mapActionToKey !== 'function') {
        throw new Error('`mapActionToKey` should be a function');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be an array of three elements.');
    }

    if (!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.');
    }

    const [requestType, successType, failureType] = types;

    const updatePagination = (state = initialState, action) => {
        switch (action.type) {
            case requestType: {
                return state
                    .set('isFetching', true);
            }

            case successType: {
                const response = action.response;
                const ids = mapResultToIds(response.get('result'));

                return state
                    .set('isFetching', false)
                    .set('nextPageUrl', response.get('nextPageUrl'))
                    .set('pageCount', state.get('pageCount') + 1)
                    .set('ids', state.get('ids').concat(ids));
            }

            case failureType: {
                return state
                    .set('isFetching', false);
            }

            default: {
                return state;
            }
        }
    };

    if (disableCaching) {
        return updatePagination;
    }

    return (state = fromJS({}), action) => {
        switch (action.type) {
            case requestType:
            case successType:
            case failureType: {
                const key = mapActionToKey(action);

                if (typeof key !== 'string') {
                    throw new Error(`Expected key to be a string intead got ${typeof key}`);
                }

                return state
                    .set(key, updatePagination(state.get(key), action));
            }

            default: {
                return state;
            }
        }
    };
}
