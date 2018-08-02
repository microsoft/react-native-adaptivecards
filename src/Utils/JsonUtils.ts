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
            return requiredProperties.reduce((prev, current) => {
                if (prev.isValid) {
                    prev.isValid = JsonUtils.isValidValue(json[current]);
                    if (!prev.isValid) {
                        // As lots of the skill team is violate the rule that title is required in all actions,
                        // we apply a temp work around in client side to unblock click containers.
                        /*****Fix starts here*****/
                        if (current === 'title') {
                            prev.isValid = true;
                        }
                        /*****Fix ends here*****/
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

    public static isValidValue(value: any): boolean {
        return !(value === undefined ||
            value === null ||
            (typeof value === 'string' && !value && value !== ''));
    }
}
