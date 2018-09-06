import { SchemaElement } from '../SchemaValidator';
export class OpenUrlActionSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Action.OpenUrl'],
            },
            'title': {
                name: 'title',
                isRequired: true,
            },
            'url': {
                name: 'url',
                isRequired: true,
            },
        };
    }
}
