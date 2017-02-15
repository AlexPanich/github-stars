import { fromJS } from 'immutable';

const initialState = fromJS({ users: {}, repos: {} });

export default function entities(state = initialState, action) {
    if (action.response && action.response.has('entities')) {
        return state.mergeDeep(action.response.get('entities'));
    }

    return state;
}
