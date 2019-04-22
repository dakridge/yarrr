import pathToRegexp from 'path-to-regexp';

const findMatchingRoute = (routes, url) => {
    let matchedKeys = null;
    let matchedRoute = null;

    for (let ii = 0; ii < routes.length; ii += 1) {
        const route = routes[ii];

        // if string, convert to array of paths
        const paths = typeof route.path === 'string' ? [route.path] : route.path;

        for (let jj = 0; jj < paths.length; jj += 1) {
            const keys = [];
            const path = paths[jj];
            const matchedPath = pathToRegexp(path, keys).exec(url);

            if (matchedPath) {
                matchedKeys = keys;
                matchedRoute = route;
                break;
            }
        }
    }

    if (matchedRoute) {
        return {
            keys : matchedKeys,
            route: matchedRoute,
        };
    }

    return null;
};

export default findMatchingRoute;
