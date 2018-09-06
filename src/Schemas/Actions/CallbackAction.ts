import { CallbackActionModel } from '../../Models/Actions/CallbackAction';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class CallbackActionSchema extends SchemaElement<CallbackActionModel> {
    public readonly rules:  SchemaRule<CallbackActionModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Action.Callback'],
        },
        'url': {
            name: 'url',
            isRequired: true,
        },
        'parameters': {
            name: 'parameters',
            isRequired: false,
        }
    };
}
