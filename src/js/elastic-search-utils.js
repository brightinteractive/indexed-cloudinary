export function objectToQueryString(jsObject) {
    Object.keys(jsObject)
        .map(key => `${key}:${jsObject[key]}`)
        .join(' AND ');
}
