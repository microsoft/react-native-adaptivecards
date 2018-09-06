import { NumberInputModel } from '../../Models/Inputs/NumberInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class NumberInputSchema extends SchemaElement<NumberInputModel> {
    public rules: SchemaRule<NumberInputModel>[] = [];
    protected propsSchemas = {
        'id': {
            name: 'id',
            isRequired: true,
        },
        'max': {
            name: 'max',
            isRequired: false,
        },
        'min': {
            name: 'min',
            isRequired: false,
        },
        'placeholder': {
            name: 'placeholder',
            isRequired: false,
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Input.Number'],
        },
        'value': {
            name: 'value',
            isRequired: false,
        },
        'spacing': {
            name: 'spacing',
            isRequired: false,
            accepts: ['none', 'small', 'default', 'medium', 'large', 'extraLarge', 'padding'],
        },
        'separator': {
            name: 'separator',
            isRequired: false,
            accepts: [true, false],
        },
    };
}
