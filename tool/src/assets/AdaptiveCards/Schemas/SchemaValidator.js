import { StringUtils } from '../Utils/StringUtils';
export class SchemaElement {
    get requiredProps() {
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
    get props() {
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
    constructor(level, message) {
        this.level = level;
        this.message = message;
    }
}
export class SchemaResult {
    constructor(isValid, ...messages) {
        this.messages = [];
        this.combine = (current) => {
            if (current) {
                this.isValid = this.isValid && current.isValid;
                if (this.messages) {
                    this.messages = this.messages.concat(current.messages);
                }
                else {
                    this.messages = current.messages;
                }
            }
            return this;
        };
        this.isValid = isValid;
        this.messages = messages;
    }
}
export class SchemaValidator {
    static shallowCheckElements(json, schema) {
        if (schema) {
            let props = Object.keys(json);
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
            result = result.combine(props.reduce((prev, current) => {
                if (current) {
                    prev = prev.combine(new SchemaResult(true, new SchemaMessage('Warning', `Unknown property ${current}`)));
                }
                return prev;
            }, new SchemaResult(true)));
            return result;
        }
        return new SchemaResult(true, new SchemaMessage('Warning', `No Schema available for the type, check type!`));
    }
    static deepCheckElement(model, schema) {
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
    static checkProp(value, schema) {
        if (schema) {
            let result = new SchemaResult(true);
            if (schema.isRequired) {
                if (!SchemaValidator.isValuePresent(value)) {
                    result = result.combine(new SchemaResult(false, new SchemaMessage('Error', `Required property ${schema.name} is null or undefined`)));
                }
            }
            if (schema.accepts && schema.accepts.length > 0) {
                let normalizedValue = value;
                if (schema.name !== 'type') {
                    normalizedValue = StringUtils.normalize(value, value);
                }
                if (value !== undefined && schema.accepts.indexOf(normalizedValue) < 0) {
                    result = result.combine(new SchemaResult(false, new SchemaMessage('Error', `Value of ${schema.name} is not acceptable.`)));
                }
            }
            if (schema.rules && schema.rules.length > 0) {
                result = result.combine(this.checkRules(value, schema.rules));
            }
            return result;
        }
        return new SchemaResult(true, new SchemaMessage('Warning', `No Schema available for ${JSON.stringify(value)}`));
    }
    static checkRules(json, rules) {
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
    static isValuePresent(value) {
        return !(value === undefined || value === null || (typeof value === 'string' && !value && value !== ''));
    }
}
