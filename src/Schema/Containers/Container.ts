import { Utils } from '../../utils';
import { ActionFactory } from '../Actions/ActionFactory';
import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { CardElement } from '../Elements/CardElement';
import { CardElementFactory } from '../Elements/CardElementFactory';
import { CardElementType } from '../Elements/CardElementType';
import { ContainerStyle } from '../enums';

export class ContainerElement extends CardElement {
    // Required
    readonly items: Array<CardElement> = [];
    // Optional
    readonly selectAction?: OpenUrlActionElement | SubmitActionElement;
    readonly style?: ContainerStyle;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
            this.selectAction = ActionFactory.create(json.selectAction);
            this.style = Utils.getStringEnumValueOrDefault(ContainerStyle, json.style, ContainerStyle.Default) as ContainerStyle;
        }
    }

    getTypeName(): string {
        return CardElementType.Container;
    }
    getRequiredProperties(): Array<string> {
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

    hasItems(): boolean {
        return this.items && this.items.length > 0;
    }
}
