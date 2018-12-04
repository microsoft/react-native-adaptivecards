export class MimeUtils {
    static isAudio(mime) {
        return mime && /^audio\//.test(mime);
    }
    static isVideo(mime) {
        return mime && /^video\//.test(mime);
    }
}
