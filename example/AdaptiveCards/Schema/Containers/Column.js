import { Utils } from '../../utils';
import { ContentElementType } from '../Base/ContentElement';
import { ColumnWidth } from '../Base/Enums';
import { FormElement } from '../Base/FormElement';
import { CardElementFactory } from '../Factories/ContentElementFactory';
export class ColumnElement extends FormElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
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
        return ContentElementType.Column;
    }
    getRequiredProperties() {
        return ['items'];
    }
    getChildren() {
        return this.items;
    }
    hasItems() {
        return this.items && this.items.length > 0;
    }
    isFixedWidth() {
        return typeof this.width === 'number';
    }
}
