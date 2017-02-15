import axios from 'axios';
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

const API_PREFIX = 'https://api.github.com';

const getNextPageUrl = response => {
    const link = response.headers.link;

    if (!link) {
        return null;
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);

    if (!nextLink) {
        return null;
    }

    return nextLink.split(';')[0].slice(1, -1);
};

export function callApi(method = 'get', endpoint, schema) {
    const fullUrl = !endpoint.includes(API_PREFIX)
        ? API_PREFIX + endpoint
        : endpoint;


    return axios(fullUrl, { method })
        .then(response => {
            const camelizedData = camelizeKeys(response.data);
            const nextPageUrl = getNextPageUrl(response);

            return fromJS({
                ...normalize(camelizedData, schema),
                nextPageUrl,
            });
        });
}

export const CALL_API = 'CALL_API';

export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint } = callAPI;
    const { schema, types, method = 'get' } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if (!schema) {
        throw new Error('Specify some Schema.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const actionWith = data => {
        const finalAction = {
            ...action,
            ...data,
        };

        delete finalAction[CALL_API];

        return finalAction;
    };

    const [requestType, successType, failureType] = types;

    next(
        actionWith({
            type: requestType,
        })
    );

    return callApi(method, endpoint, schema).then(
        response => next(
            actionWith({
                response,
                type: successType,
            })
        ),
        error => next(
            actionWith({
                type: failureType,
                error: error.message || 'Error happened during API call',
            })
        )
    );
};
