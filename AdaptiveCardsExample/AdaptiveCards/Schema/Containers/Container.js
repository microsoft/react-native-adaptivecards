import { ContainerStyle, } from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import { createAction } from '../Actions/Creator';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import { createCardElementSet } from '../Elements/Creator';
export default class Container extends CardElement {
    constructor(json) {
        super(json);
        this.items = [];
        if (this.isValidJSON) {
            this.items = createCardElementSet(json.items);
            this.selectAction = createAction(json.selectAction);
            this.style = getStringEnumValueOrDefault(ContainerStyle, json.style, ContainerStyle.Default);
        }
    }
    getTypeName() {
        return CardElementType.Container;
    }
    getRequiredProperties() {
        return ['items'];
    }
    hasItems() {
        return this.items && this.items.length > 0;
    }
}
