import { ColumnSetModel } from '../../Models/Containers/ColumnSet';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ColumnSetSchema extends SchemaElement<ColumnSetModel> {
    rules: SchemaRule<ColumnSetModel>[];
    protected propsSchemas: {
        'columns': {
            name: string;
            isRequired: boolean;
        };
        'selectAction': {
            name: string;
            isRequired: boolean;
        };
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'height': {
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
