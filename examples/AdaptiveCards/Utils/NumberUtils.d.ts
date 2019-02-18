export declare class NumberUtils {
    static isInRange<T extends number | Date>(value: T, min: T, max: T): boolean;
    static isNumberStrict(value: string): boolean;
    static isNumber(value: string): boolean;
    static isSymbol(value: string): boolean;
}
