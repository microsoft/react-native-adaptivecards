import { NumberInputModel } from '../../Models/Inputs/NumberInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class NumberInputSchema extends SchemaElement<NumberInputModel> {
    rules: SchemaRule<NumberInputModel>[];
    protected propsSchemas: {
        'id': {
            name: string;
            isRequired: boolean;
        };
        'max': {
            name: string;
            isRequired: boolean;
        };
        'min': {
            name: string;
            isRequired: boolean;
        };
        'placeholder': {
            name: string;
            isRequired: boolean;
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
