import { ScopeElement } from '../Abstract/ScopeElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
export class ColumnElement extends ScopeElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.items = ContentElementFactory.createSet(json.items, this);
            this.style = json.style;
            this.verticalContentAlignment = json.verticalContentAlignment;
            if (json.width) {
                if (json.width === 'auto' || json.width === 'stretch') {
                    this.width = json.width;
                }
                else {
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
    get children() {
        if (this.items) {
            return this.items;
        }
        return [];
    }
    get requiredProperties() {
        return ['type', 'items'];
    }
}
