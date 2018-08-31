export class ConsoleUtils {
    static log(type, message) {
        console.log(`${type}: ${message}`);
    }
    static warning(type, message) {
        console.warn(`${type}: ${message}`);
    }
    static error(type, message) {
        console.error(`${type}: ${message}`);
    }
}
