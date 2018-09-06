import { SchemaElement } from '../SchemaValidator';
export class ChoiceInputSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Input.Choice'],
            },
            'title': {
                name: 'title',
                isRequired: true,
            },
            'value': {
                name: 'value',
                isRequired: true,
            },
        };
    }
}
