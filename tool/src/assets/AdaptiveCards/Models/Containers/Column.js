import { ScopeModel } from '../Abstract/ScopeModel';
import { ContentModelFactory } from '../Factories/ContentModelFactory';
export class ColumnModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.items = [];
        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.style = json.style;
        this.height = json.height;
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
        }
    }
    get children() {
        if (this.selectAction) {
            return [...this.items, this.selectAction];
        }
        return this.items;
    }
}
