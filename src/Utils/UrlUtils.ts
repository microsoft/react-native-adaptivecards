export class UrlUtils {
    public static isRemoteUrl(url: string) {
        return (url && /(((http)s*)|(ftp)|(data)):/.test(url) );
    }
}
