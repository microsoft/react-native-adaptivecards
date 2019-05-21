import { ScopeModel } from '../Abstract/ScopeModel';
import { BackgroundImageModel } from '../CardElements/BackgroundImage';
import { ContentModelFactory } from '../Factories/ContentModelFactory';
export class ColumnModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.items = [];
        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.style = json.style;
        this.height = json.height;
        this.width = 'auto';
        this.verticalContentAlignment = json.verticalContentAlignment;
        if (json.width) {
            if (typeof json.width === 'string') {
                this.width = json.width.toLowerCase() === 'stretch' ? 'stretch' : 'auto';
            }
            else if (typeof json.width === 'number') {
                let columnWidth = parseInt(json.width, 10);
                if (columnWidth < 0) {
                    columnWidth = 0;
                }
                this.width = columnWidth;
            }
        }
        if (json.backgroundImage) {
            this.backgroundImage = new BackgroundImageModel(json.backgroundImage, this, this.context);
            this.context.fit = 'background';
        }
    }
    get children() {
        if (this.selectAction) {
            return [...this.items, this.selectAction, this.backgroundImage];
        }
        return this.items;
    }
}
