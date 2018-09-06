import { TextBlockModel } from '../../Models/CardElements/TextBlock';
import { SchemaElement, SchemaMessage, SchemaResult, SchemaRule } from '../SchemaValidator';

export class TextBlockSchema extends SchemaElement<TextBlockModel> {
    public rules: SchemaRule<TextBlockModel>[] = [
        (model: TextBlockModel) => {
            if (model.maxLines && typeof(model.maxLines) !== 'number') {
                return new SchemaResult(false, new SchemaMessage('Error', `Only number accepted.`));
            }
            return new SchemaResult(true);
        }
    ];
    protected propsSchemas = {
        'color': {
            name: 'color',
            isRequired: false,
            accepts: ['default', 'dark', 'light', 'accent', 'good', 'warning', 'attention']
        },
        'horizontalAlignment': {
            name: 'horizontalAlignment',
            isRequired: false,
            accepts: ['left', 'center', 'right']
        },
        'isSubtle': {
            name: 'isSubtle',
            isRequired: false,
            accepts: [true, false],
        },
        'maxLines': {
            name: 'maxLines',
            isRequired: false,
        },
        'size': {
            name: 'size',
            isRequired: false,
            accepts: ['small', 'default', 'medium', 'large', 'extraLarge'],
        },
        'text': {
            name: 'text',
            isRequired: true,
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['TextBlock'],
        },
        'weight': {
            name: 'weight',
            isRequired: false,
            accepts: ['lighter', 'default', 'bolder'],
        },
        'wrap': {
            name: 'wrap',
            isRequired: false,
            accepts: [true, false],
        },
        'id': {
            name: 'id',
            isRequired: false,
        },
        'spacing': {
            name: 'spacing',
            isRequired: false,
            accepts: ['none', 'small', 'default', 'medium', 'large', 'extraLarge', 'padding'],
        },
        'separator': {
            name: 'separator',
            isRequired: false,
            accepts: [true, false],
        },
    };
}
