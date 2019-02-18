import { AbstractModel } from '../Models/Abstract/AbstractModel';
import { SchemaElement } from '../Schemas/SchemaValidator';
export declare class SchemaStore {
    private schemas;
    private constructor();
    static createInstance(): SchemaStore;
    read(type: string): SchemaElement<AbstractModel>;
}
