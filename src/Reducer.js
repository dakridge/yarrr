// dependencies
import { fromJS } from 'immutable';

export const actions = {
    update: '@@ROUTER-UPDATE',
    mount : '@@ROUTER-MOUNTED',
};

const initialState = fromJS({
    hash        : '',
    query       : '',
    location    : null,
    lastAction  : null,
    matchedRoute: null,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.mount:
        case actions.update: {
            return state.withMutations((mutable) => {
                mutable.set('hash', action.payload.hash);
                mutable.set('query', action.payload.query);
                mutable.set('location', action.payload.location);
                mutable.set('lastAction', action.payload.action);
                mutable.set('matchedRoute', action.payload.matchedRoute);
            });
        }

        default:
            return state;
    }
};

export default reducer;
