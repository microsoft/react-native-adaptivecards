import { ActionType } from '../../Shared/Types';
import { SchemaElement, SchemaMessage, SchemaResult } from '../SchemaValidator';
export class PeoplePickerSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [
            (model) => {
                if (model.callback && model.callback.type !== ActionType.Callback) {
                    return new SchemaResult(false, new SchemaMessage('Error', `Only ${ActionType.Callback} accepted.`));
                }
                return new SchemaResult(true);
            }
        ];
        this.propsSchemas = {
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
}
