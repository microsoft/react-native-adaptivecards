import { TextBlockModel } from '../../Models/CardElements/TextBlock';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class TextBlockSchema extends SchemaElement<TextBlockModel> {
    rules: SchemaRule<TextBlockModel>[];
    protected propsSchemas: {
        'color': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'horizontalAlignment': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'isSubtle': {
            name: string;
            isRequired: boolean;
            accepts: boolean[];
        };
        'maxLines': {
            name: string;
            isRequired: boolean;
        };
        'size': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'text': {
            name: string;
            isRequired: boolean;
        };
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'weight': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'wrap': {
            name: string;
            isRequired: boolean;
            accepts: boolean[];
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
