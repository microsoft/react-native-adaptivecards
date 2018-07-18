import { ValidationResult } from '../Shared/Types';

export class JsonUtils {
    public static isValidateJson(json: any, requiredProperties: string[]): ValidationResult {
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
    }

    public static isValidValue(value: any): boolean {
        return !(value === undefined ||
            value === null ||
            (typeof value === 'string' && !value && value !== ''));
    }
}
