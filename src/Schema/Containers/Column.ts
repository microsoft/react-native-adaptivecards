import { ContentElement } from '../Abstract/ContentElement';
import { ScopeElement } from '../Abstract/ScopeElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
import { IElement } from '../Interfaces/IElement';

export class ColumnElement extends ScopeElement {
    // Required
    public readonly items: Array<ContentElement>;
    // Optional
    // “auto”, “stretch”, or a number representing relative width of the column in the column group
    public readonly width?: 'auto' | 'stretch' | number;
    public readonly height?: 'auto' | 'stretch';

    constructor(json: any, parent: IElement) {
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
                this.height = json.height;
            }
        }
    }

    public get children() {
        if (this.items) {
            return this.items;
        }
        return [];
    }

    public get requiredProperties() {
        return ['type', 'items'];
    }
}
