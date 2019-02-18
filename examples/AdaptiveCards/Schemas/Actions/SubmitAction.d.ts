import { SubmitActionModel } from '../../Models/Actions/SubmitAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class SubmitActionSchema extends SchemaElement<SubmitActionModel> {
    readonly rules: SchemaRule<SubmitActionModel>[];
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
        'data': {
            name: string;
            isRequired: boolean;
        };
    };
}
