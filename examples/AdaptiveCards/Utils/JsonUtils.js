export class JsonUtils {
    static isValidateJson(json, requiredProperties) {
        if (!json) {
            return {
                isValid: false,
                message: 'data not found',
            };
        }
        if (requiredProperties) {
            let message = '';
            let isValid = requiredProperties.every((property) => {
                let validate = JsonUtils.isValidValue(json[property]);
                if (!validate) {
                    message = `${property} is required`;
                }
                return validate;
            });
            return {
                message: message,
                isValid: isValid,
            };
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
