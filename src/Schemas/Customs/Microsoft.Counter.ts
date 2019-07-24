import { CounterModel } from '../../Models/Customs/Microsoft.Counter';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class CounterSchema extends SchemaElement<CounterModel> {
    public rules: SchemaRule<CounterModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Microsoft.Counter'],
        },
        'value': {
            name: 'value',
            isRequired: true,
        },
        'format': {
            name: 'format',
            isRequired: false,
            accepts: ['Timer', 'CountDown'],
        },
        'delay': {
            name: 'delay',
            isRequired: false,
        },
        'callback': {
            name: 'callback',
            isRequired: false,
        },
        'id': {
            name: 'id',
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
