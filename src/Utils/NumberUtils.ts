export class NumberUtils {
    public static isInRange<T extends number | Date>(value: T, min: T, max: T) {
        if (value !== undefined && min !== undefined && max !== undefined) {
            return (value >= min && value <= max);
        }
        if (value !== undefined && min !== undefined) {
            return (value >= min);
        }
        if (value !== undefined && max !== undefined) {
            return (value <= max);
        }
        return true;
    }

    public static isNumberStrict(value: string) {
        return /^(\+|-)?\d+($|\.\d+$)/.test(value);
    }

    public static isNumber(value: string) {
        return /^(\+|-)?\d+($|\.\d*$)/.test(value);
    }

    public static isSymbol(value: string) {
        return /^(\+|-)?$/.test(value);
    }
}
