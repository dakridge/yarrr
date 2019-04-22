/**
  * Returns the item from the routes list.
  * @param {state} state - the state
  * @param {any} notSetValue - value if not found
  */
export const getMatchedRouteObject = (state, notSetValue = null) => state.getIn(['router', 'matchedRoute', 'route'], notSetValue);

/** Returns the component to render */
export const getComponent = state => state.getIn(['router', 'matchedRoute', 'route', 'render'], null);
