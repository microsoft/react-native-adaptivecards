export class NetworkService {
    public static async get(url: string, parameters: { [key: string]: string }) {
        let finalUrl = NetworkService.buildParameterizedUrl(url, parameters);
        if (finalUrl && finalUrl.length > 0) {
            return fetch(finalUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        } else {
            throw new Error('url is empty');
        }
    }

    public static async post(url: string, parameters: { [key: string]: string }) {
        if (url && url.length > 0) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            });
        } else {
            throw new Error('url is empty');
        }
    }

    private static buildParameterizedUrl(url: string, parameters: { [key: string]: string; }): string {
        let finalUrl = url;
        if (finalUrl && finalUrl.length > 0) {
            if (!finalUrl.includes('?')) {
                finalUrl += '?';
            }
            return Object.keys(parameters).reduce((prev, current) => {
                let separator: string;
                if (prev !== undefined && prev.length > 0 && prev[prev.length - 1] === '?') {
                    separator = '';
                } else {
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
        } else {
            return undefined;
        }
    }
}
