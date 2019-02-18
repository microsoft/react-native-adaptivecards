import { ChoiceSetModel } from '../../Models/Inputs/ChoiceSet';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ChoiceSetSchema extends SchemaElement<ChoiceSetModel> {
    rules: SchemaRule<ChoiceSetModel>[];
    protected propsSchemas: {
        'choices': {
            name: string;
            isRequired: boolean;
        };
        'id': {
            name: string;
            isRequired: boolean;
        };
        'isMultiSelect': {
            name: string;
            isRequired: boolean;
            accepts: boolean[];
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
