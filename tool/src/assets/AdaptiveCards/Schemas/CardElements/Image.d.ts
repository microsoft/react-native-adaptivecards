import { ImageModel } from '../../Models/CardElements/Image';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ImageSchema extends SchemaElement<ImageModel> {
    rules: SchemaRule<ImageModel>[];
    protected propsSchemas: {
        'altText': {
            name: string;
            isRequired: boolean;
        };
        'horizontalAlignment': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'selectAction': {
            name: string;
            isRequired: boolean;
        };
        'size': {
            name: string;
            isRequired: boolean;
            accepts: string[];
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
        'url': {
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
