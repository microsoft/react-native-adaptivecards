import { ShowCardActionModel } from '../../Models/Actions/ShowCardAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ShowCardActionSchema extends SchemaElement<ShowCardActionModel> {
    readonly rules: SchemaRule<ShowCardActionModel>[];
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
        'card': {
            name: string;
            isRequired: boolean;
        };
    };
}
