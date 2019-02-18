import { FactModel } from '../../Models/Containers/Fact';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class FactSchema extends SchemaElement<FactModel> {
    rules: SchemaRule<FactModel>[];
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
