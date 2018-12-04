export class MimeUtils {
    public static isAudio(mime: string) {
        return mime && /^audio\//.test(mime);
    }

    public static isVideo(mime: string) {
        return mime && /^video\//.test(mime);
    }
}
