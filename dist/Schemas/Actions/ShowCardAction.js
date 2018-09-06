import { SchemaElement } from '../SchemaValidator';
export class ShowCardActionSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Action.ShowCard'],
            },
            'title': {
                name: 'title',
                isRequired: true,
            },
            'card': {
                name: 'card',
                isRequired: true,
            },
        };
    }
}
