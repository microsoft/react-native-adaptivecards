export class UrlUtils {
    static isRemoteUrl(url) {
        return (url && /^(((http)s*)|(ftp)):/.test(url));
    }
    static isEncodedData(url) {
        return (url && /^data:/.test(url));
    }
    static isSvgXml(url) {
        return (url && /(^data:image\/svg\+xml)|(\.svg$)/.test(url));
    }
    static isDeepLink(url) {
        return !UrlUtils.isRemoteUrl(url) && !UrlUtils.isEncodedData(url);
    }
}
