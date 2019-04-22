import Router from './Router';
import Reducer from './Reducer';
import Link from './components/Link';
import { push, replace } from './actions';
import { getMatchedRouteObject } from './selectors';

export default Router;

export {
    Link,
    push,
    replace,
    Reducer as reducer,
    getMatchedRouteObject as getMatchedRoute,
};
