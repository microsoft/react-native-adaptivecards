import { ChoiceSetModel } from '../../Models/Inputs/ChoiceSet';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class ChoiceSetSchema extends SchemaElement<ChoiceSetModel> {
    public rules: SchemaRule<ChoiceSetModel>[] = [];
    protected propsSchemas = {
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
