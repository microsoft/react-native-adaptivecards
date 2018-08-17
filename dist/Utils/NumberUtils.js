export class NumberUtils {
    static isInRange(value, min, max) {
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
    static isNumberStrict(value) {
        return /^(\+|-)?\d+($|\.\d+$)/.test(value);
    }
    static isNumber(value) {
        return /^(\+|-)?\d+($|\.\d*$)/.test(value);
    }
    static isSymbol(value) {
        return /^(\+|-)?$/.test(value);
    }
}
