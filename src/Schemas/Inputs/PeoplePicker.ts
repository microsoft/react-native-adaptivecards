import { PeoplePickerModel } from '../../Models/Inputs/PeoplePicker';
import { ActionType } from '../../Shared/Types';
import { SchemaElement, SchemaMessage, SchemaResult, SchemaRule } from '../SchemaValidator';

export class PeoplePickerSchema extends SchemaElement<PeoplePickerModel> {
    public rules: SchemaRule<PeoplePickerModel>[] = [
        (model: PeoplePickerModel) => {
            if (model.callback && model.callback.type !== ActionType.Callback) {
                return new SchemaResult(false, new SchemaMessage('Error', `Only ${ActionType.Callback} accepted.`));
            }
            return new SchemaResult(true);
        }
    ];
    protected propsSchemas = {
        'id': {
            name: 'id',
            isRequired: true,
        },
        'placeholder': {
            name: 'placeholder',
            isRequired: false,
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Input.PeoplePicker'],
        },
        'value': {
            name: 'value',
            isRequired: false,
        },
        'callback': {
            name: 'callback',
            isRequired: true,
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
