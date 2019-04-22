// dependencies
import history from './history';

export const push = (url, state = {}) => () => {
    history.push(url, state);
};

export const replace = (url, state = {}) => () => {
    history.replace(url, state);
};
