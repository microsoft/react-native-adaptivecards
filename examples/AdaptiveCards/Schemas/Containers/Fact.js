import { SchemaElement } from '../SchemaValidator';
export class FactSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Fact'],
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
