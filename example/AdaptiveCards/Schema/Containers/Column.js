import { Utils } from '../../utils';
import { ActionFactory } from '../Actions/ActionFactory';
import { CardElement } from '../Elements/CardElement';
import { CardElementFactory } from '../Elements/CardElementFactory';
import { CardElementType } from '../Elements/CardElementType';
import { ColumnWidth } from '../enums';
export class ColumnElement extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
            this.selectAction = ActionFactory.create(json.selectAction);
            if (json.width && !isNaN(json.width)) {
                let columnWidth = parseInt(json.width, 10);
                if (columnWidth > 100) {
                    this.width = 100;
                }
                else if (columnWidth < 0) {
                    this.width = 0;
                }
                else {
                    this.width = columnWidth;
                }
            }
            else {
                this.width = Utils.getStringEnumValueOrDefault(ColumnWidth, json.width, ColumnWidth.Auto);
            }
        }
    }
    getTypeName() {
        return CardElementType.Column;
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
    isFixedWidth() {
        return typeof this.width === 'number';
    }
}
