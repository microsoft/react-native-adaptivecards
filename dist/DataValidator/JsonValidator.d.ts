export declare class JsonValidator {
    static isSchemaValid(Json: any): boolean;
    static getSchemaCheckResult(Json: any): import("../Schemas/SchemaValidator").SchemaResult;
    static getDescendsAndSelf(Json: any): import("../Models/Abstract/AbstractModel").AbstractModel[];
    static getSchemaCheckMessage(Json: any): (boolean | string[])[];
}
