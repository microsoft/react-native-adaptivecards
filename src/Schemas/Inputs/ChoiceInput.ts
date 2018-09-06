import { ChoiceInputModel } from '../../Models/Inputs/ChoiceInput';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class ChoiceInputSchema extends SchemaElement<ChoiceInputModel> {
    public rules: SchemaRule<ChoiceInputModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Input.Choice'],
        },
        'title': {
            name: 'title',
            isRequired: true,
        },
        'value': {
            name: 'value',
            isRequired: true,
        },
    };
}
