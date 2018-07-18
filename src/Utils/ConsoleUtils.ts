export class ConsoleUtils {
    public static log(type: string, message: string) {
        console.log(`${type}: ${message}`);
    }

    public static warning(type: string, message: string) {
        console.warn(`${type}: ${message}`);
    }

    public static error(type: string, message: string) {
        console.error(`${type}: ${message}`);
    }
}
