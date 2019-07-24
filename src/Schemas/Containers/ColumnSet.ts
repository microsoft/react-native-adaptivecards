import { ColumnSetModel } from '../../Models/Containers/ColumnSet';
import { ActionType } from '../../Shared/Types';
import { SchemaElement, SchemaMessage, SchemaResult, SchemaRule } from '../SchemaValidator';

export class ColumnSetSchema extends SchemaElement<ColumnSetModel> {
    public rules: SchemaRule<ColumnSetModel>[] = [
        (model: ColumnSetModel) => {
            if (model.selectAction && model.selectAction.type !== ActionType.OpenUrl && model.selectAction.type !== ActionType.Submit) {
                return new SchemaResult(false, new SchemaMessage('Error', `Only ${ActionType.OpenUrl} and ${ActionType.Submit} accepted.`));
            }
            return new SchemaResult(true);
        }
    ];
    protected propsSchemas = {
        'columns': {
            name: 'columns',
            isRequired: true,
        },
        'selectAction': {
            name: 'selectAction',
            isRequired: false,
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['ColumnSet'],
        },
        'height': {
            name: 'height',
            isRequired: false,
            accepts: ['auto', 'stretch'],
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
