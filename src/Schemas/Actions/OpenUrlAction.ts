import { OpenUrlActionModel } from '../../Models/Actions/OpenUrlAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class OpenUrlActionSchema extends SchemaElement<OpenUrlActionModel> {
    public readonly rules:  SchemaRule<OpenUrlActionModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Action.OpenUrl'],
        },
        'title': {
            name: 'title',
            isRequired: true,
        },
        'url': {
            name: 'url',
            isRequired: true,
        },
    };
}
