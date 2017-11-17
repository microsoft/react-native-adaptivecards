import {
    ContainerStyle,
} from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import Action from '../Actions/Action';
import { createAction } from '../Actions/Creator';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import { createCardElementSet } from '../Elements/Creator';

export default class Container extends CardElement {
    // Required
    readonly items: Array<CardElement> = [];
    // Optional
    readonly selectAction?: Action;
    readonly style?: ContainerStyle;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.items = createCardElementSet(json.items);
            this.selectAction = createAction(json.selectAction);
            this.style = getStringEnumValueOrDefault(ContainerStyle, json.style, ContainerStyle.Default) as ContainerStyle;
        }
    }

    getTypeName(): string {
        return CardElementType.Container;
    }
    getRequiredProperties(): Array<string> {
        return ['items'];
    }

    hasItems(): boolean {
        return this.items && this.items.length > 0;
    }
}
