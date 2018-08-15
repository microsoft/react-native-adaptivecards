export class UrlUtils {
    public static isRemoteUrl(url: string) {
        return (url && /^(((http)s*)|(ftp)):/.test(url));
    }

    public static isEncodedData(url: string) {
        return (url && /^data:/.test(url));
    }

    public static isSvgXml(url: string) {
        return (url && /(^data:image\/svg\+xml)|(\.svg$)/.test(url));
    }

    public static isDeepLink(url: string) {
        return !UrlUtils.isRemoteUrl(url) && !UrlUtils.isEncodedData(url);
    }
}
