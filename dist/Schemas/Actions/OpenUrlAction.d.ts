import { OpenUrlActionModel } from '../../Models/Actions/OpenUrlAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class OpenUrlActionSchema extends SchemaElement<OpenUrlActionModel> {
    readonly rules: SchemaRule<OpenUrlActionModel>[];
    protected propsSchemas: {
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'title': {
            name: string;
            isRequired: boolean;
        };
        'url': {
            name: string;
            isRequired: boolean;
        };
        '-ms-method': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        '-ms-data': {
            name: string;
            isRequired: boolean;
        };
    };
}
