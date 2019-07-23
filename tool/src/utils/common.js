export function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function parseJson(jsonString) {
    let jsonObject = '';
    try {
        jsonObject = JSON.parse(jsonString);
    } catch (e) {
        console.log('Failed to parse json string: ', e);
    }
    return jsonObject;
}

export function stringifyJson(jsonObject) {
    return JSON.stringify(jsonObject, null, 4);
}
