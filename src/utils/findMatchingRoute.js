import pathToRegexp from 'path-to-regexp';

const findMatchingRoute = (routes, url) => {
    let matchedKeys = null;
    let matchedRoute = null;
    let matchedKeyMap = null;

    mainRouteLoop:
    for (let ii = 0; ii < routes.length; ii += 1) {
        const route = routes[ii];

        // if string, convert to array of paths
        const paths = typeof route.path === 'string' ? [route.path] : route.path;

        for (let jj = 0; jj < paths.length; jj += 1) {
            const keys = [];
            const path = paths[jj];
            const regexp = pathToRegexp(path, keys);
            const matchedPath = regexp.exec(url);

            if (matchedPath) {
                const keyMap = {};

                keys.forEach((key, kk) => {
                    keyMap[key.name] = matchedPath[kk + 1];
                });

                matchedKeys = keys;
                matchedRoute = route;
                matchedKeyMap = keyMap;
                break mainRouteLoop;
            }
        }
    }

    if (matchedRoute) {
        return {
            keys  : matchedKeys,
            route : matchedRoute,
            keyMap: matchedKeyMap,
        };
    }

    return null;
};

export default findMatchingRoute;
