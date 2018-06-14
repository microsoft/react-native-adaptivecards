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
    static prettifyString(valueString, fix, length, position) {
        if (valueString && valueString.length < length && fix && fix.length > 0) {
            let result = valueString;
            let count = length - valueString.length;
            for (let i = 0; i < count; i++) {
                if (position === 'pre') {
                    result = fix[0] + result;
                }
                else {
                    result = result + fix[0];
                }
            }
            return result;
        }
        return valueString;
    }
    static isDate(value) {
        return /^\d{4}(\-\d{2}){2}$/.test(value);
    }
    static isTime(value) {
        return /^\d{2}\:\d{2}$/.test(value);
    }
    static extractDate(value) {
        if (Utils.isDate(value)) {
            let parts = value.split('-');
            return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        }
        return undefined;
    }
    static extractTime(value) {
        if (Utils.isTime(value)) {
            let parts = value.split(':');
            return new Date(2020, 0, 1, Number(parts[0]), Number(parts[1]));
        }
        return undefined;
    }
    static getDateString(date) {
        if (date) {
            return (`${Utils.prettifyString(date.getFullYear().toString(), '0', 2, 'pre')}-` +
                `${Utils.prettifyString((date.getMonth() + 1).toString(), '0', 2, 'pre')}-` +
                `${Utils.prettifyString(date.getDate().toString(), '0', 2, 'pre')}`);
        }
        return undefined;
    }
    static getTimeString(date) {
        if (date) {
            return Utils.composeTimeString(date.getHours(), date.getMinutes());
        }
        return undefined;
    }
    static composeTimeString(hour, minute) {
        return (`${Utils.prettifyString(hour.toString(), '0', 2, 'pre')}:` +
            `${Utils.prettifyString(minute.toString(), '0', 2, 'pre')}`);
    }
}
