import { TextInputModel } from '../../Models/Inputs/TextInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class TextInputSchema extends SchemaElement<TextInputModel> {
    rules: SchemaRule<TextInputModel>[];
    protected propsSchemas: {
        'id': {
            name: string;
            isRequired: boolean;
        };
        'isMultiline': {
            name: string;
            isRequired: boolean;
            accepts: boolean[];
        };
        'placeholder': {
            name: string;
            isRequired: boolean;
        };
        'style': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'value': {
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
