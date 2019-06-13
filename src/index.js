import Router from './Router';
import Reducer from './Reducer';
import Link from './components/Link';
import { push, replace } from './actions';
import { getMatchedRouteObject, getMatchedRouteKeyValue, getParsedQuery } from './selectors';

export default Router;

export {
    Link,
    push,
    replace,
    getParsedQuery,
    Reducer as reducer,
    getMatchedRouteKeyValue,
    getMatchedRouteObject as getMatchedRoute,
};
