import { FactSetModel } from '../../Models/Containers/FactSet';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class FactSetSchema extends SchemaElement<FactSetModel> {
    rules: SchemaRule<FactSetModel>[];
    protected propsSchemas: {
        'facts': {
            name: string;
            isRequired: boolean;
        };
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'id': {
            name: string;
            isRequired: boolean;
        };
        'spacing': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'separator': {
            name: string;
            isRequired: boolean;
            accepts: boolean[];
        };
    };
}
