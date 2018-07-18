export class StringUtils {
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
}
