export class Utils {
    public static getEnumValueOrDefault(targetEnum: { [s: number]: string }, name: string, defaultValue: number): number {
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

    public static getStringEnumValueOrDefault(targetEnum: any, name: string, defaultValue: string): string {
        if (!name) {
            return defaultValue;
        }

        for (const key in targetEnum) {
            if (targetEnum.hasOwnProperty(key)) {
                let value: string = targetEnum[key];
                if (value.toLowerCase() === name.toLowerCase()) {
                    return value;
                }
            }
        }

        return defaultValue;
    }

    public static isValidValue(value: any): boolean {
        return !(value === undefined ||
            value === null ||
            (typeof value === 'string' && !value));
    }

    public static isInRange<T extends number | Date>(value: T, min: T, max: T) {
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

    public static isNumberStrict(value: string) {
        return /^(\+|-)?\d+($|\.\d+$)/.test(value);
    }

    public static isNumber(value: string) {
        return /^(\+|-)?\d+($|\.\d*$)/.test(value);
    }

    public static isSymbol(value: string) {
        return /^(\+|-)?$/.test(value);
    }

    public static prettifyString(valueString: string, fix: string, length: number, position: 'pre' | 'post') {
        if (valueString && valueString.length < length && fix && fix.length > 0) {
            let result = valueString;
            let count = length - valueString.length;
            for (let i = 0; i < count; i++) {
                if (position === 'pre') {
                    result = fix[0] + result;
                } else {
                    result = result + fix[0];
                }
            }
            return result;
        }
        return valueString;
    }

    public static isDate(value: string) {
        return /^\d{4}(\-\d{2}){2}$/.test(value);
    }

    public static isTime(value: string) {
        return /^\d{2}\:\d{2}$/.test(value);
    }

    public static extractDate(value: string) {
        if (Utils.isDate(value)) {
            let parts = value.split('-');
            return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        }
        return undefined;
    }

    public static extractTime(value: string) {
        if (Utils.isTime(value)) {
            let parts = value.split(':');
            return new Date(2020, 0, 1, Number(parts[0]), Number(parts[1]));
        }
        return undefined;
    }

    public static getDateString(date: Date) {
        if (date) {
            return (
                `${Utils.prettifyString(date.getFullYear().toString(), '0', 2, 'pre')}-` +
                `${Utils.prettifyString((date.getMonth() + 1).toString(), '0', 2, 'pre')}-` +
                `${Utils.prettifyString(date.getDate().toString(), '0', 2, 'pre')}`
            );
        }
        return undefined;
    }

    public static getTimeString(date: Date) {
        if (date) {
            return Utils.composeTimeString(date.getHours(), date.getMinutes());
        }
        return undefined;
    }

    public static composeTimeString(hour: number, minute: number) {
        return (
            `${Utils.prettifyString(hour.toString(), '0', 2, 'pre')}:` +
            `${Utils.prettifyString(minute.toString(), '0', 2, 'pre')}`
        );
    }
}
