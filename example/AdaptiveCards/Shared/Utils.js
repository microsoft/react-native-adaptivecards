export class Utils {
    static getEnumValueOrDefault(targetEnum, name, defaultValue) {
        if (!name) {
            return defaultValue;
        }
        for (const key in targetEnum) {
            if (targetEnum.hasOwnProperty(key)) {
                let isValueProperty = parseInt(key, 10) >= 0;
                if (isValueProperty) {
                    let value = targetEnum[key];
                    if (value && typeof value === 'string') {
                        if (value.toLowerCase() === name.toLowerCase()) {
                            return parseInt(key, 10);
                        }
                    }
                }
            }
        }
        return defaultValue;
    }
    static getStringEnumValueOrDefault(targetEnum, name, defaultValue) {
        if (!name) {
            return defaultValue;
        }
        for (const key in targetEnum) {
            if (targetEnum.hasOwnProperty(key)) {
                let value = targetEnum[key];
                if (value.toLowerCase() === name.toLowerCase()) {
                    return value;
                }
            }
        }
        return defaultValue;
    }
    static isValidValue(value) {
        return !(value === undefined ||
            value === null ||
            (typeof value === 'string' && !value));
    }
    static isInRange(value, min, max) {
        console.log('Range: ' + min + ' --- ' + max);
        console.log('Value: ' + value);
        if (value !== undefined && min !== undefined && max !== undefined) {
            console.log('Check full range');
            return (value >= min && value <= max);
        }
        if (value !== undefined && min !== undefined) {
            console.log('Check min range');
            return (value >= min);
        }
        if (value !== undefined && max !== undefined) {
            console.log('Check ax range');
            return (value <= max);
        }
        return false;
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
