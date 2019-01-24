export class UrlUtils {
    static isRemoteUrl(url) {
        return url && /^(((http)s*)|(ftp)):/.test(url);
    }
    static isEncodedData(url) {
        return (url && /^data:/.test(url)) || (url && /^file:/.test(url));
    }
    static isSvgXml(url) {
        return url && /(^data:image\/svg\+xml)|(\.svg$)/.test(url);
    }
    static isDeepLink(url) {
        return url && /^[\w]+:\/\//.test(url) && !UrlUtils.isRemoteUrl(url) && !UrlUtils.isEncodedData(url);
    }
    static isRelativeUrl(url) {
        return url && !UrlUtils.isRemoteUrl(url) && !UrlUtils.isEncodedData(url) && !UrlUtils.isDeepLink(url);
    }
    static composeUrl(base, path) {
        if (base && base.length > 0 && path && path.length > 0) {
            if (base[base.length - 1] === '/') {
                if (path[0] === '/') {
                    return base + path.slice(1);
                }
                else {
                    return base + path;
                }
            }
            else {
                if (path[0] === '/') {
                    return base + path;
                }
                else {
                    return base.slice(base.length - 1) + path;
                }
            }
        }
        if (base && base.length > 0) {
            return base;
        }
        if (path && path.length > 0) {
            return path;
        }
        return '';
    }
    static toAbsolute(url, host) {
        if (UrlUtils.isRelativeUrl(url)) {
            return UrlUtils.composeUrl(host, url);
        }
        return url;
    }
}
