import { CounterModel } from '../../Models/Customs/Microsoft.Counter';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class CounterSchema extends SchemaElement<CounterModel> {
    rules: SchemaRule<CounterModel>[];
    protected propsSchemas: {
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'value': {
            name: string;
            isRequired: boolean;
        };
        'format': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'delay': {
            name: string;
            isRequired: boolean;
        };
        'callback': {
            name: string;
            isRequired: boolean;
        };
        'id': {
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
