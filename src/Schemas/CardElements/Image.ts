import { ImageModel } from '../../Models/CardElements/Image';
import { ActionType } from '../../Shared/Types';
import { SchemaElement, SchemaMessage, SchemaResult, SchemaRule } from '../SchemaValidator';

export class ImageSchema extends SchemaElement<ImageModel> {
    public rules: SchemaRule<ImageModel>[] = [
        (model: ImageModel) => {
            if (model.selectAction && model.selectAction.type !== ActionType.OpenUrl && model.selectAction.type !== ActionType.Submit) {
                return new SchemaResult(false, new SchemaMessage('Error', `Only ${ActionType.OpenUrl} and ${ActionType.Submit} accepted.`));
            }
            return new SchemaResult(true);
        }
    ];
    protected propsSchemas = {
        'altText': {
            name: 'altText',
            isRequired: false,
        },
        'horizontalAlignment': {
            name: 'horizontalAlignment',
            isRequired: false,
            accepts: ['left', 'center', 'right']
        },
        'selectAction': {
            name: 'selectAction',
            isRequired: false,
        },
        'size': {
            name: 'size',
            isRequired: false,
            accepts: ['auto', 'stretch', 'small', 'medium', 'large'],
        },
        'style': {
            name: 'style',
            isRequired: false,
            accepts: ['default', 'person'],
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['Image'],
        },
        'url': {
            name: 'url',
            isRequired: true,
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
