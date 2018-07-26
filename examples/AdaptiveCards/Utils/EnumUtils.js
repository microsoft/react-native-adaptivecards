export class EnumUtils {
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
}
