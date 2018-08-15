export class StyleUtils {
    public static isFlexWidth(flex: number) {
        return flex && flex > 0;
    }

    public static isFixedSize(width: number, height: number) {
        return width && width > 0 && height && height > 0;
    }
}
