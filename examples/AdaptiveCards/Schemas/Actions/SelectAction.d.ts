import { SelectActionModel } from '../../Models/Actions/SelectAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class SelectActionSchema extends SchemaElement<SelectActionModel> {
    rules?: SchemaRule<SelectActionModel>[];
    protected propsSchemas: {
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'selectedTextTitle': {
            name: string;
            isRequired: boolean;
        };
        'selectedTextSubTitle': {
            name: string;
            isRequired: boolean;
        };
        'data': {
            name: string;
            isRequired: boolean;
        };
    };
}
