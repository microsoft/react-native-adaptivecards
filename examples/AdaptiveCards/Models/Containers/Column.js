import { StringUtils } from '../../Utils/StringUtils';
import { ScopeModel } from '../Abstract/ScopeModel';
import { BackgroundImageModel } from '../CardElements/BackgroundImage';
import { ContentModelFactory } from '../Factories/ContentModelFactory';
export class ColumnModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.items = [];
        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.style = StringUtils.normalize(json.style);
        this.height = StringUtils.normalize(json.height);
        this.verticalContentAlignment = StringUtils.normalize(json.verticalContentAlignment, 'top');
        this.width = StringUtils.normalize(json.width);
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
