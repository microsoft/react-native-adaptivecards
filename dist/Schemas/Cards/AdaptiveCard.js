import { Language } from '../../Shared/Lang';
import { SchemaElement } from '../SchemaValidator';
export class CardSchema extends SchemaElement {
    constructor() {
        super(...arguments);
        this.rules = [];
        this.propsSchemas = {
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
                isRequired: true,
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
}
