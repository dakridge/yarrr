# Yet Another Redux React Router (YARRR)

This is just another router that keeps everything stored in the redux store. Right now, it expects the entire store to be using Immutable.js.

## Install

```
yarn add yarrr
```

## How to Use

Attach it to the `router` key in your reducers:

```javascript
import { reducer } from 'yarrr';
import { combineReducers } from 'redux-immutable';

import ui from './ui';

export default () => combineReducers({
    ui,
    router: reducer,
});
```

Create a list of all of your routes and pass it in as a prop to the `<Router />` component.

```javascript
import React from 'react';
import Router from 'yarrr';

const routes = [
    { path: '/', render: () => <Home /> },
    { path: '/dashboard', render: () => <Dashboard /> },
];

export class App extends React.Component {
    render() {
        return (
            <div>
                <Router routes={routes} />
            </div>
        );
    }
}
```

You can also get the matched route using the `getMatchedRoute` selector.

```javascript
import { getMatchedRoute } from 'yarrr';

const getPage = (state) => {
    // get the matched route, return `null` if not found.
    const matchedRoute = getMatchedRoute(state, null);

    // will return { path: '/dashboard', render: () => <Dashboard /> } if user is on `/dashboard`
    return matchedRoute;
};
```

There is a `<Link />` component that can be used to link to another route like so

```javascript
<Link to="/" className="navigtion" replace={false}>Home</Link>
```

Additionally, you can use the `push` or `replace` actions.

```javascript
import { push, replace } from 'yarrr';

export const changePage = (url) => (dispatch) => {
    dispatch(push(url));
};

export const replacePage = (url) => (dispatch) => {
    dispatch(replace(url));
};

```