import { SchemaElement } from '../SchemaValidator';
export class BackgroundImageSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'horizontalAlignment': {
                name: 'horizontalAlignment',
                isRequired: false,
                accepts: ['left', 'center', 'right']
            },
            'verticalAlignment': {
                name: 'verticalAlignment',
                isRequired: false,
                accepts: ['top', 'center', 'bottom'],
            },
            'mode': {
                name: 'mode',
                isRequired: false,
                accepts: ['stretch', 'repeatHorizontally', 'repeatVertically', 'repeat'],
            },
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['BackgroundImage'],
            },
            'url': {
                name: 'url',
                isRequired: true,
            },
        };
    }
}
