import { FactModel } from '../../Models/Containers/Fact';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class FactSchema extends SchemaElement<FactModel> {
    public rules: SchemaRule<FactModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Fact'],
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
