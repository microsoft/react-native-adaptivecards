import { SubmitActionModel } from '../../Models/Actions/SubmitAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class SubmitActionSchema extends SchemaElement<SubmitActionModel> {
    public readonly rules: SchemaRule<SubmitActionModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Action.Submit'],
        },
        'title': {
            name: 'title',
            isRequired: true,
        },
        'data': {
            name: 'data',
            isRequired: false,
        },
    };
}
