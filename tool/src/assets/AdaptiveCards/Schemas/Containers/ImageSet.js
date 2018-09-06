import { SchemaElement } from '../SchemaValidator';
export class ImageSetSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
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
                accepts: ['none', 'small', 'default', 'medium', 'large', 'extraLarge', 'padding'],
            },
            'separator': {
                name: 'separator',
                isRequired: false,
                accepts: [true, false],
            },
        };
    }
}
