import { Utils } from '../../utils';
import { ActionFactory } from '../Actions/ActionFactory';
import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { CardElement } from '../Elements/CardElement';
import { CardElementFactory } from '../Elements/CardElementFactory';
import { CardElementType } from '../Elements/CardElementType';
import { ColumnWidth } from '../enums';

export class ColumnElement extends CardElement {
    // Required
    readonly items: Array<CardElement>;
    // Optional
    readonly selectAction?: OpenUrlActionElement | SubmitActionElement;
    // “auto”, “stretch”, or a number representing relative width of the column in the column group
    readonly width?: ColumnWidth | number;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
            this.selectAction = ActionFactory.create(json.selectAction);
            if (json.width && !isNaN(json.width)) {
                let columnWidth = parseInt(json.width, 10);
                if (columnWidth > 100) {
                    this.width = 100;
                } else if (columnWidth < 0) {
                    this.width = 0;
                } else {
                    this.width = columnWidth;
                }
            } else {
                this.width = Utils.getStringEnumValueOrDefault(ColumnWidth, json.width, ColumnWidth.Auto) as ColumnWidth;
            }
        }
    }

    getTypeName(): string {
        return CardElementType.Column;
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

    isFixedWidth(): boolean {
        return typeof this.width === 'number';
    }
}
