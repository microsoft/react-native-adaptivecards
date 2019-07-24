import { TextInputModel } from '../../Models/Inputs/TextInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class TextInputSchema extends SchemaElement<TextInputModel> {
    public rules: SchemaRule<TextInputModel>[] = [];
    protected propsSchemas = {
        'id': {
            name: 'id',
            isRequired: true,
        },
        'isMultiline': {
            name: 'isMultiline',
            isRequired: false,
            accepts: [true, false]
        },
        'placeholder': {
            name: 'placeholder',
            isRequired: false,
        },
        'style': {
            name: 'style',
            isRequired: false,
            accepts: ['text', 'url', 'tel', 'email'],
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Input.Text'],
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
