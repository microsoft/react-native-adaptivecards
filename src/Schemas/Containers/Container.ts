import { ContainerModel } from '../../Models/Containers/Container';
import { ActionType } from '../../Shared/Types';
import { SchemaElement, SchemaMessage, SchemaResult, SchemaRule } from '../SchemaValidator';

export class ContainerSchema extends SchemaElement<ContainerModel> {
    public rules: SchemaRule<ContainerModel>[] = [
        (model: ContainerModel) => {
            if (model.selectAction && model.selectAction.type !== ActionType.OpenUrl && model.selectAction.type !== ActionType.Submit) {
                return new SchemaResult(false, new SchemaMessage('Error', `Only ${ActionType.OpenUrl} and ${ActionType.Submit} accepted.`));
            }
            return new SchemaResult(true);
        }
    ];
    protected propsSchemas = {
        'items': {
            name: 'items',
            isRequired: true,
        },
        'selectAction': {
            name: 'selectAction',
            isRequired: false,
        },
        'style': {
            name: 'style',
            isRequired: false,
            accepts: ['default', 'emphasis'],
        },
        'height': {
            name: 'height',
            isRequired: false,
            accepts: ['auto', 'stretch'],
        },
        'verticalContentAlignment': {
            name: 'verticalContentAlignment',
            isRequired: false,
            accepts: ['top', 'center', 'bottom'],
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Container'],
        },
        'id': {
            name: 'id',
            isRequired: false,
        },
        'backgroundImage': {
            name: 'backgroundImage',
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
