export class JsonUtils {
    static isValidateJson(json, requiredProperties) {
        if (!json) {
            return {
                isValid: false,
                message: 'data not found',
            };
        }
        if (requiredProperties) {
            return requiredProperties.reduce((prev, current) => {
                if (prev.isValid) {
                    prev.isValid = JsonUtils.isValidValue(json[current]);
                    if (!prev.isValid) {
                        if (current === 'title') {
                            prev.isValid = true;
                        }
                        prev.message = `${current} is required`;
                    }
                }
                return prev;
            }, { isValid: true, message: '', });
        }
        return {
            isValid: true,
            message: ''
        };
    }
    static isValidValue(value) {
        return !(value === undefined ||
            value === null ||
            (typeof value === 'string' && !value && value !== ''));
    }
}
