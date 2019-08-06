export class StringUtils {
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

    public static normalize(value: any, defaultValue?: any): any {
        if (value === null || value === undefined) {
            return defaultValue;
        }
        if (typeof value === 'string') {
            return value.toLowerCase();
        }
        return value;
    }
}
