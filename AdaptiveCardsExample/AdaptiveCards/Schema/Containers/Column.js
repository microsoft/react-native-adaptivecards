import { ColumnWidth, } from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import { createAction } from '../Actions/Creator';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import { createCardElementSet } from '../Elements/Creator';
export default class Column extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.items = createCardElementSet(json.items);
            this.selectAction = createAction(json.selectAction);
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
                this.width = getStringEnumValueOrDefault(ColumnWidth, json.width, ColumnWidth.Auto);
            }
        }
    }
    getTypeName() {
        return CardElementType.Column;
    }
    getRequiredProperties() {
        return ['items'];
    }
    hasItems() {
        return this.items && this.items.length > 0;
    }
    isFixedWidth() {
        return typeof this.width === 'number';
    }
}
