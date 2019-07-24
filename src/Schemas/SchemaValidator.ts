import { StringUtils } from '../Utils/StringUtils';

export type SchemaRule<T> = (value: T) => SchemaResult;

export interface SchemaProperty<T> {
    name: string;
    isRequired: boolean;
    accepts?: T[];
    rules?: SchemaRule<T>[];
}

export abstract class SchemaElement<T> {
    protected abstract propsSchemas: { [type: string]: SchemaProperty<any> };

    public readonly abstract rules?: SchemaRule<T>[];

    public get requiredProps(): SchemaProperty<any>[] {
        if (this.propsSchemas) {
            return Object.values(this.propsSchemas).reduce((prev, current) => {
                if (current && current.isRequired) {
                    prev.push(current);
                }
                return prev;
            }, []);
        }
        return [];
    }

    public get props(): SchemaProperty<any>[] {
        if (this.propsSchemas) {
            return Object.values(this.propsSchemas).reduce((prev, current) => {
                if (current) {
                    prev.push(current);
                }
                return prev;
            }, []);
        }
        return [];
    }
}

export class SchemaMessage {
    public readonly level: 'Info' | 'Warning' | 'Error';
    public readonly message: string;

    constructor(level: 'Info' | 'Warning' | 'Error', message: string) {
        this.level = level;
        this.message = message;
    }
}

export class SchemaResult {
    public isValid: boolean;
    public messages: SchemaMessage[] = [];

    constructor(isValid: boolean, ...messages: SchemaMessage[]) {
        this.isValid = isValid;
        this.messages = messages;
    }

    public combine = (current: SchemaResult) => {
        if (current) {
            this.isValid = this.isValid && current.isValid;
            if (this.messages) {
                this.messages = this.messages.concat(current.messages);
            } else {
                this.messages = current.messages;
            }
        }
        return this;
    }
}

export class SchemaValidator {
    public static shallowCheckElements<T>(json: any, schema: SchemaElement<T>) {
        if (schema) {
            let props = Object.keys(json);

            // Check if all property requirements has been matched
            let result = schema.props.reduce((prev, current) => {
                if (current) {
                    prev = prev.combine(SchemaValidator.checkProp(json[current.name], current));
                    let index = props.indexOf(current.name);
                    if (index > -1) {
                        props.splice(index, 1);
                    }
                }
                return prev;
            }, new SchemaResult(true));

            // Label unknown properties.
            result = result.combine(props.reduce((prev, current) => {
                if (current) {
                    // tslint:disable-next-line:max-line-length
                    prev = prev.combine(new SchemaResult(true, new SchemaMessage('Warning', `Unknown property ${current}`)));
                }
                return prev;
            }, new SchemaResult(true)));

            return result;
        }
        // return new SchemaResult(true, new SchemaMessage('Warning', `No Schema available for ${JSON.stringify(json)}`));
        return new SchemaResult(true, new SchemaMessage('Warning', `No Schema available for the type, check type!`));
    }

    public static deepCheckElement<T>(model: T, schema: SchemaElement<T>) {
        if (schema) {
            let result = new SchemaResult(true);
            if (schema.rules) {
                result = schema.rules.reduce((prev, current) => {
                    if (current) {
                        let ruleResult = current(model);
                        if (ruleResult) {
                            prev.combine(ruleResult);
                        }
                    }
                    return prev;
                }, result);
            }
            return result;
        }
        return new SchemaResult(true, new SchemaMessage('Warning', `No Schema available for ${JSON.stringify(model)}`));
    }

    public static checkProp<T>(value: T, schema: SchemaProperty<T>) {
        if (schema) {
            let result = new SchemaResult(true);
            // Check if this props is required but value is not present.
            if (schema.isRequired) {
                if (!SchemaValidator.isValuePresent(value)) {
                    // tslint:disable-next-line:max-line-length
                    result = result.combine(new SchemaResult(false, new SchemaMessage('Error', `Required property ${schema.name} is null or undefined`)));
                }
            }

            // Check if the value of this props is acceptable.
            if (schema.accepts && schema.accepts.length > 0) {
                let normalizedValue = value;
                if (schema.name !== 'type') {
                    normalizedValue = StringUtils.normalize(value, value);
                }
                if (value !== undefined && schema.accepts.indexOf(normalizedValue) < 0) {
                    // tslint:disable-next-line:max-line-length
                    result = result.combine(new SchemaResult(false, new SchemaMessage('Error', `Value of ${schema.name} is not acceptable.`)));
                }
            }

            // Check if the prop meet rules.
            if (schema.rules && schema.rules.length > 0) {
                result = result.combine(this.checkRules(value, schema.rules));
            }
            return result;
        }
        return new SchemaResult(true, new SchemaMessage('Warning', `No Schema available for ${JSON.stringify(value)}`));
    }

    private static checkRules<T>(json: T, rules: Array<SchemaRule<T>>) {
        let result = new SchemaResult(true);
        if (rules) {
            result = rules.reduce((prev, current) => {
                if (current) {
                    let ruleResult = current(json);
                    if (ruleResult) {
                        prev.combine(ruleResult);
                    }
                }
                return prev;
            }, result);
        }
        return result;
    }

    private static isValuePresent(value: any): boolean {
        return !(value === undefined || value === null || (typeof value === 'string' && !value && value !== ''));
    }
}
