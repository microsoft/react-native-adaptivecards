import { ShowCardActionModel } from '../../Models/Actions/ShowCardAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class ShowCardActionSchema extends SchemaElement<ShowCardActionModel> {
    public readonly rules:  SchemaRule<ShowCardActionModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Action.ShowCard'],
        },
        'title': {
            name: 'title',
            isRequired: true,
        },
        'card': {
            name: 'card',
            isRequired: true,
        },
    };
}
