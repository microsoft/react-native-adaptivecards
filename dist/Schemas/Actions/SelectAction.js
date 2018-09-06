import { SchemaElement } from '../SchemaValidator';
export class SelectActionSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Action.Select'],
            },
            'selectedTextTitle': {
                name: 'selectedTextTitle',
                isRequired: true,
            },
            'selectedTextSubTitle': {
                name: 'selectedTextSubTitle',
                isRequired: true,
            },
            'data': {
                name: 'data',
                isRequired: false,
            },
        };
    }
}
