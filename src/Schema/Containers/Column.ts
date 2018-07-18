import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';

export class ColumnElement extends FormElement {
    // Required
    public readonly items: Array<ContentElement>;
    // Optional
    // “auto”, “stretch”, or a number representing relative width of the column in the column group
    public readonly width?: 'auto' | 'stretch' | number;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.items = ContentElementFactory.createSet(json.items, this);
            if (json.width) {
                if (json.width === 'auto' || json.width === 'stretch') {
                    this.width = json.width;
                } else {
                    let columnWidth = parseInt(json.width, 10);
                    if (columnWidth < 0) {
                        columnWidth = 0;
                    }
                    this.width = columnWidth;
                }
            }
        }
    }

    public get children(): AbstractElement[] {
        if (this.items) {
            return this.items;
        }
        return [];
    }

    protected getRequiredProperties(): Array<string> {
        return ['type', 'items'];
    }
}
