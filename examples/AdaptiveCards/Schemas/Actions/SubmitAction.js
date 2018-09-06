import { SchemaElement } from '../SchemaValidator';
export class SubmitActionSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Action.Submit'],
            },
            'title': {
                name: 'title',
                isRequired: true,
            },
            'data': {
                name: 'data',
                isRequired: false,
            },
        };
    }
}
