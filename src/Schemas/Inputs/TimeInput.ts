import { TimeInputModel } from '../../Models/Inputs/TimeInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class TimeInputSchema extends SchemaElement<TimeInputModel> {
    public rules: SchemaRule<TimeInputModel>[] = [];

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
            accepts: ['Input.Time'],
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
