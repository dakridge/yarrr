// dependencies
import queryStringParser from 'query-string';

/**
  * Returns the item from the routes list.
  * @param {state} state - the state
  * @param {any} notSetValue - value if not found
  */
export const getMatchedRouteObject = (state, notSetValue = null) => state.getIn(['router', 'matchedRoute', 'route'], notSetValue);

/** Returns the component to render */
export const getComponent = state => state.getIn(['router', 'matchedRoute', 'route', 'render'], null);

/**
 * Returns the value of a url parameter
 * @param {object} state
 * @param {string} keyName
 * @param {any} notSetValue
 */
export const getMatchedRouteKeyValue = (state, keyName, notSetValue = null) => {
    const keyMap = state.getIn(['router', 'matchedRoute', 'keyMap'], {});
    const foundKey = Object.prototype.hasOwnProperty.call(keyMap, keyName);

    if (foundKey) {
        return keyMap[keyName];
    }

    return notSetValue;
};

/**
 * Gets a parsed query parameter object.
 * @param {object} state
 */
export const getParsedQuery = (state) => {
    const query = state.getIn(['router', 'query'], {});
    const parsed = queryStringParser.parse(query);

    return parsed;
};
