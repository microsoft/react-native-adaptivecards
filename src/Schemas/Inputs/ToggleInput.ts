import { ToggleInputModel } from '../../Models/Inputs/ToggleInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class ToggleInputSchema extends SchemaElement<ToggleInputModel> {
    public rules: SchemaRule<ToggleInputModel>[] = [];
    protected propsSchemas = {
        'id': {
            name: 'id',
            isRequired: true,
        },
        'title': {
            name: 'title',
            isRequired: true,
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Input.Toggle'],
        },
        'value': {
            name: 'value',
            isRequired: false,
        },
        'valueOff': {
            name: 'valueOff',
            isRequired: false,
        },
        'valueOn': {
            name: 'valueOn',
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
