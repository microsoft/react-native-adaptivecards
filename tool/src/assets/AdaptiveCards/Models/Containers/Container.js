import { StringUtils } from '../../Utils/StringUtils';
import { ScopeModel } from '../Abstract/ScopeModel';
import { BackgroundImageModel } from '../CardElements/BackgroundImage';
import { ContentModelFactory } from '../Factories/ContentModelFactory';
export class ContainerModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.items = [];
        this.style = StringUtils.toLowerCase(json.style);
        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.height = StringUtils.toLowerCase(json.height);
        this.verticalContentAlignment = StringUtils.toLowerCase(json.verticalContentAlignment);
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
