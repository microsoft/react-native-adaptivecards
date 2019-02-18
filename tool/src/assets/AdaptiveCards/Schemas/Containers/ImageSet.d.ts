import { ImageSetModel } from '../../Models/Containers/ImageSet';
import { SchemaElement, SchemaRule } from '../SchemaValidator';
export declare class ImageSetSchema extends SchemaElement<ImageSetModel> {
    rules: SchemaRule<ImageSetModel>[];
    protected propsSchemas: {
        'images': {
            name: string;
            isRequired: boolean;
        };
        'imageSize': {
            name: string;
            isRequired: boolean;
            accepts: string[];
        };
        'type': {
            name: string;
            isRequired: boolean;
            accepts: string[];
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
