import { Utils } from '../../utils';
import { ActionFactory } from '../Actions/ActionFactory';
import { CardElement } from '../Elements/CardElement';
import { CardElementFactory } from '../Elements/CardElementFactory';
import { CardElementType } from '../Elements/CardElementType';
import { ContainerStyle } from '../enums';
export class ContainerElement extends CardElement {
    constructor(json) {
        super(json);
        this.items = [];
        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
            this.selectAction = ActionFactory.create(json.selectAction);
            this.style = Utils.getStringEnumValueOrDefault(ContainerStyle, json.style, ContainerStyle.Default);
        }
    }
    getTypeName() {
        return CardElementType.Container;
    }
    getRequiredProperties() {
        return ['items'];
    }
    supportAction() {
        return true;
    }
    getAction() {
        return this.selectAction;
    }
    getActions() {
        return [this.getAction()];
    }
    hasItems() {
        return this.items && this.items.length > 0;
    }
}
