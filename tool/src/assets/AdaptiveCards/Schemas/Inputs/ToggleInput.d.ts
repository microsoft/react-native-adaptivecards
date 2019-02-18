import { ToggleInputModel } from '../../Models/Inputs/ToggleInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ToggleInputSchema extends SchemaElement<ToggleInputModel> {
    rules: SchemaRule<ToggleInputModel>[];
    protected propsSchemas: {
        'id': {
            name: string;
            isRequired: boolean;
        };
        'title': {
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
        'valueOff': {
            name: string;
            isRequired: boolean;
        };
        'valueOn': {
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
