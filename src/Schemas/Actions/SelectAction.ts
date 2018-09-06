import { SelectActionModel } from '../../Models/Actions/SelectAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class SelectActionSchema extends SchemaElement<SelectActionModel> {
    public rules?:  SchemaRule<SelectActionModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Action.Select'],
        },
        'selectedTextTitle': {
            name: 'selectedTextTitle',
            isRequired: true,
        },
        'selectedTextSubTitle': {
            name: 'selectedTextSubTitle',
            isRequired: true,
        },
        'data': {
            name: 'data',
            isRequired: false,
        },
    };
}
