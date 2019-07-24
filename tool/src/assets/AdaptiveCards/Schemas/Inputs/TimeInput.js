import { SchemaElement } from '../SchemaValidator';
export class TimeInputSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'id': {
                name: 'id',
                isRequired: true,
            },
            'max': {
                name: 'max',
                isRequired: false,
            },
            'min': {
                name: 'min',
                isRequired: false,
            },
            'placeholder': {
                name: 'placeholder',
                isRequired: false,
            },
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Input.Time'],
            },
            'value': {
                name: 'value',
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
}
