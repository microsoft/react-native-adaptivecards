import { ColumnWidth } from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { CardElementFactory } from '../Factories/ContentElementFactory';

export class ColumnElement extends FormElement {
    // Required
    public readonly items: Array<ContentElement>;
    // Optional
    // “auto”, “stretch”, or a number representing relative width of the column in the column group
    public readonly width?: ColumnWidth | number;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items, this);
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
                this.width = EnumUtils.getStringEnumValueOrDefault(ColumnWidth, json.width, ColumnWidth.Auto) as ColumnWidth;
            }
        }
    }

    public getTypeName(): string {
        return ContentElementType.Column;
    }

    public getRequiredProperties(): Array<string> {
        return ['items'];
    }

    public getChildren() {
        return this.items;
    }

    public getStyleConfig(): ElementStyleConfig {
        return {
            spacing: this.spacing,
            columnWidth: this.width,
        };
    }

    public hasItems(): boolean {
        return this.items && this.items.length > 0;
    }

    public isFixedWidth(): boolean {
        return typeof this.width === 'number';
    }
}
