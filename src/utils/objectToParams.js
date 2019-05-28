/**
 * Serrializes an object into a query parameter string for a URL.
 * @param {Object} params - object to convert to query string params
 */
const objectToParams = params => Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

export default objectToParams;
