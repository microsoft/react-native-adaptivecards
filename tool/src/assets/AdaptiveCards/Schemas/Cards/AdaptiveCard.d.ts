import { CardModel } from '../../Models/Cards/Card';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class CardSchema extends SchemaElement<CardModel> {
    rules: SchemaRule<CardModel>[];
    protected propsSchemas: {
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'actions': {
            name: string;
            isRequired: boolean;
        };
        'body': {
            name: string;
            isRequired: boolean;
        };
        'version': {
            name: string;
            isRequired: boolean;
        };
        'fallbackText': {
            name: string;
            isRequired: boolean;
        };
        'backgroundImage': {
            name: string;
            isRequired: boolean;
        };
        'speak': {
            name: string;
            isRequired: boolean;
        };
        'lang': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
    };
}
