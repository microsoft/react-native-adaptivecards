import { SchemaElement } from '../SchemaValidator';
export class ChoiceSetSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
            'choices': {
                name: 'choices',
                isRequired: true,
            },
            'id': {
                name: 'id',
                isRequired: true,
            },
            'isMultiSelect': {
                name: 'isMultiSelect',
                isRequired: false,
                accepts: [true, false],
            },
            'style': {
                name: 'style',
                isRequired: false,
                accepts: ['compact', 'expanded'],
            },
            'type': {
                name: 'type',
                isRequired: true,
                accepts: ['Input.ChoiceSet'],
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
