export function objectToQueryString(jsObject) {
    var queryString = Object.keys(jsObject)
        .map(key => `${key}:${jsObject[key]}`)
        .join(' AND ');
    return queryString;
}
