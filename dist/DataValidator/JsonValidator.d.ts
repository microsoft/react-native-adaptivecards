export declare class JsonValidator {
    static isSchemaValid(json: any): boolean;
    static getSchemaCheckResult(json: any): import("../Schemas/SchemaValidator").SchemaResult;
    static getDescendsAndSelf(json: any): import("../Models/Abstract/AbstractModel").AbstractModel[];
    static getSchemaCheckMessage(json: any): (boolean | string[])[];
}
