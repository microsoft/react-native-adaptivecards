import { CardModel } from '../../Models/Cards/Card';
import { Language } from '../../Shared/Lang';
import { SchemaElement, SchemaRule } from '../SchemaValidator';

export class CardSchema extends SchemaElement<CardModel> {
    public rules: SchemaRule<CardModel>[] = [];
    protected propsSchemas = {
        'type': {
            name: 'type',
            isRequired: true,
            accepts: ['AdaptiveCard']
        },
        'actions': {
            name: 'actions',
            isRequired: false,
        },
        'body': {
            name: 'body',
            isRequired: false,
        },
        'version': {
            name: 'version',
            isRequired: false,
        },
        'fallbackText': {
            name: 'fallbackText',
            isRequired: false,
        },
        'backgroundImage': {
            name: 'backgroundImage',
            isRequired: false,
        },
        'speak': {
            name: 'speak',
            isRequired: false,
        },
        'lang': {
            name: 'lang',
            isRequired: false,
            accepts: Language.codes,
        },
    };
}
