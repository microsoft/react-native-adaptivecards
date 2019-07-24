import { SchemaElement } from '../SchemaValidator';
export class FactSetSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'facts': {
                name: 'facts',
                isRequired: true,
            },
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['FactSet'],
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
}
