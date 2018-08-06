export class UrlUtils {
    static isRemoteUrl(url) {
        return (url && /(((http)s*)|(ftp)|(data)):/.test(url));
    }
}
