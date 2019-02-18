import { ChoiceInputModel } from '../../Models/Inputs/ChoiceInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ChoiceInputSchema extends SchemaElement<ChoiceInputModel> {
    rules: SchemaRule<ChoiceInputModel>[];
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
        'value': {
            name: string;
            isRequired: boolean;
        };
    };
}
