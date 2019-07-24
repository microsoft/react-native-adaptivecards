import { ImageSetModel } from '../../Models/Containers/ImageSet';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class ImageSetSchema extends SchemaElement<ImageSetModel> {
    public rules: SchemaRule<ImageSetModel>[] = [];
    protected propsSchemas = {
        'images': {
            name: 'images',
            isRequired: true,
        },
        'imageSize': {
            name: 'imageSize',
            isRequired: false,
            accepts: ['auto', 'stretch', 'small', 'medium', 'large'],
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['ImageSet'],
        },
        'id': {
            name: 'id',
            isRequired: false,
        },
        'spacing': {
            name: 'spacing',
            isRequired: false,
            accepts: ['none', 'small', 'default', 'medium', 'large', 'extralarge', 'padding'],
        },
        'separator': {
            name: 'separator',
            isRequired: false,
            accepts: [true, false],
        },
    };
}
