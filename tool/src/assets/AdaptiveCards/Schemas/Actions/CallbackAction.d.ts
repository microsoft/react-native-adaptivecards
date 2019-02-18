import { CallbackActionModel } from '../../Models/Actions/CallbackAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class CallbackActionSchema extends SchemaElement<CallbackActionModel> {
    readonly rules: SchemaRule<CallbackActionModel>[];
    protected propsSchemas: {
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'url': {
            name: string;
            isRequired: boolean;
        };
        'parameters': {
            name: string;
            isRequired: boolean;
        };
    };
}
