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
            let columnWidth = parseInt(json.width, 10);
            if (isNaN(columnWidth)) {
                this.width = json.width.toLowerCase() === 'stretch' ? 'stretch' : 'auto';
            }
            else {
                this.width = columnWidth < 0 ? 0 : columnWidth;
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
