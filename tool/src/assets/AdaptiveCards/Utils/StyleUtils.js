export class StyleUtils {
    static isFlexWidth(flex) {
        return flex && flex > 0;
    }
    static isFixedSize(width, height) {
        return width && width > 0 && height && height > 0;
    }
}
