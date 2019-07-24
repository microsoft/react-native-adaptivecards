import { FactSetModel } from '../../Models/Containers/FactSet';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class FactSetSchema extends SchemaElement<FactSetModel> {
    public rules: SchemaRule<FactSetModel>[] = [];
    protected propsSchemas = {
        'facts': {
            name: 'facts',
            isRequired: true,
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['FactSet'],
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
