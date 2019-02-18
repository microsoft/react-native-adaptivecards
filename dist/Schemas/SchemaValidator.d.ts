export declare type SchemaRule<T> = (value: T) => SchemaResult;
export interface SchemaProperty<T> {
    name: string;
    isRequired: boolean;
    accepts?: T[];
    rules?: SchemaRule<T>[];
}
export declare abstract class SchemaElement<T> {
    protected abstract propsSchemas: {
        [type: string]: SchemaProperty<any>;
    };
    abstract readonly rules?: SchemaRule<T>[];
    readonly requiredProps: SchemaProperty<any>[];
    readonly props: SchemaProperty<any>[];
}
export declare class SchemaMessage {
    readonly level: 'Info' | 'Warning' | 'Error';
    readonly message: string;
    constructor(level: 'Info' | 'Warning' | 'Error', message: string);
}
export declare class SchemaResult {
    isValid: boolean;
    messages: SchemaMessage[];
    constructor(isValid: boolean, ...messages: SchemaMessage[]);
    combine: (current: SchemaResult) => this;
}
export declare class SchemaValidator {
    static shallowCheckElements<T>(json: any, schema: SchemaElement<T>): SchemaResult;
    static deepCheckElement<T>(model: T, schema: SchemaElement<T>): SchemaResult;
    static checkProp<T>(value: T, schema: SchemaProperty<T>): SchemaResult;
    private static checkRules;
    private static isValuePresent;
}
