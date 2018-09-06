import { SchemaElement } from '../SchemaValidator';
export class CallbackActionSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Action.Callback'],
            },
            'url': {
                name: 'url',
                isRequired: true,
            },
            'parameters': {
                name: 'parameters',
                isRequired: false,
            }
        };
    }
}
