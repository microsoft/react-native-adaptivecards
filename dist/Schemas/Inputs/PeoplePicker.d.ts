import { PeoplePickerModel } from '../../Models/Inputs/PeoplePicker';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class PeoplePickerSchema extends SchemaElement<PeoplePickerModel> {
    rules: SchemaRule<PeoplePickerModel>[];
    protected propsSchemas: {
        'id': {
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
        'callback': {
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
