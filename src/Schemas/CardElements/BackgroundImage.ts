import { BackgroundImageModel } from '../../Models/CardElements/BackgroundImage';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class BackgroundImageSchema extends SchemaElement<BackgroundImageModel> {
    public rules: SchemaRule<BackgroundImageModel>[] = [];
    protected propsSchemas = {
        'horizontalAlignment': {
            name: 'horizontalAlignment',
            isRequired: false,
            accepts: ['left', 'center', 'right']
        },
        'verticalAlignment': {
            name: 'verticalAlignment',
            isRequired: false,
            accepts: ['top', 'center', 'bottom'],
        },
        'mode': {
            name: 'mode',
            isRequired: false,
            accepts: ['stretch', 'repeatHorizontally', 'repeatVertically', 'repeat'],
        },
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['BackgroundImage'],
        },
        'url': {
            name: 'url',
            isRequired: true,
        },
    };
}
