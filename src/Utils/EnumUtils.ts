export class EnumUtils {
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
}
