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

    public static isInRange(value: number, min: number, max: number) {
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
