export class UrlUtils {
    public static isRemoteUrl(url: string) {
        return url && /^(((http)s*)|(ftp)):/.test(url);
    }

    public static isEncodedData(url: string) {
        return url && /^data:/.test(url);
    }

    public static isSvgXml(url: string) {
        return url && /(^data:image\/svg\+xml)|(\.svg$)/.test(url);
    }

    public static isDeepLink(url: string) {
        return url && /^[\w]+:\/\//.test(url) && !UrlUtils.isRemoteUrl(url) && !UrlUtils.isEncodedData(url);
    }

    public static isRelativeUrl(url: string) {
        return url && !UrlUtils.isRemoteUrl(url) && !UrlUtils.isEncodedData(url) && !UrlUtils.isDeepLink(url);
    }

    public static composeUrl(base: string, path: string) {
        if (base && base.length > 0 && path && path.length > 0) {
            if (base[base.length - 1] === '/') {
                if (path[0] === '/') {
                    return base + path.slice(1);
                } else {
                    return base + path;
                }
            } else {
                if (path[0] === '/') {
                    return base + path;
                } else {
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

    public static toAbsolute(url: string, host: string) {
        if (UrlUtils.isRelativeUrl(url)) {
            return UrlUtils.composeUrl(host, url);
        }
        return url;
    }
}
