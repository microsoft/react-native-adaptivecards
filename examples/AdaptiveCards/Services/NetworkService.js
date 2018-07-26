var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class NetworkService {
    static get(url, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let finalUrl = NetworkService.buildParameterizedUrl(url, parameters);
            if (finalUrl && finalUrl.length > 0) {
                return fetch(finalUrl, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
            }
            else {
                throw new Error('url is empty');
            }
        });
    }
    static post(url, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (url && url.length > 0) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parameters),
                });
            }
            else {
                throw new Error('url is empty');
            }
        });
    }
    static buildParameterizedUrl(url, parameters) {
        let finalUrl = url;
        if (finalUrl && finalUrl.length > 0) {
            if (!finalUrl.includes('?')) {
                finalUrl += '?';
            }
            return Object.keys(parameters).reduce((prev, current) => {
                let separator;
                if (prev !== undefined && prev.length > 0 && prev[prev.length - 1] === '?') {
                    separator = '';
                }
                else {
                    separator = '&';
                }
                if (current !== undefined && current.length > 0) {
                    let value = parameters[current];
                    if (value !== undefined) {
                        return `${prev}${separator}${current}=${value}`;
                    }
                }
                return prev;
            }, finalUrl);
        }
        else {
            return undefined;
        }
    }
}
