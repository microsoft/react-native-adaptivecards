import { Utils } from '../../utils';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { ColumnWidth } from '../Base/Enums';
import { FormElement } from '../Base/FormElement';
import { CardElementFactory } from '../Factories/ContentElementFactory';

export class ColumnElement extends FormElement {
    // Required
    readonly items: Array<ContentElement>;
    // Optional
    // “auto”, “stretch”, or a number representing relative width of the column in the column group
    readonly width?: ColumnWidth | number;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
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
        return ContentElementType.Column;
    }

    getRequiredProperties(): Array<string> {
        return ['items'];
    }

    getChildren() {
        return this.items;
    }

    hasItems(): boolean {
        return this.items && this.items.length > 0;
    }

    isFixedWidth(): boolean {
        return typeof this.width === 'number';
    }
}
