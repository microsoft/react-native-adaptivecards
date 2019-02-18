import { BackgroundImageModel } from '../../Models/CardElements/BackgroundImage';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class BackgroundImageSchema extends SchemaElement<BackgroundImageModel> {
    rules: SchemaRule<BackgroundImageModel>[];
    protected propsSchemas: {
        'horizontalAlignment': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'verticalAlignment': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'mode': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'url': {
            name: string;
            isRequired: boolean;
        };
    };
}
