import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ScopeModel } from '../Abstract/ScopeModel';
import { BackgroundImageModel } from '../CardElements/BackgroundImage';
import { ContentModelFactory } from '../Factories/ContentModelFactory';

export class ContainerModel extends ScopeModel {
    public items: ContentModel[] = [];
    public height: 'auto' | 'stretch';
    public verticalContentAlignment: 'top' | 'center' | 'bottom';
    public style: 'default' | 'emphasis';
    public backgroundImage: BackgroundImageModel;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.style = StringUtils.normalize(json.style);
        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.height = StringUtils.normalize(json.height);
        this.verticalContentAlignment = StringUtils.normalize(json.verticalContentAlignment, 'top');

        if (json.backgroundImage) {
            this.backgroundImage = new BackgroundImageModel(json.backgroundImage, this, this.context);
            this.context.fit = 'background';
        }
    }

    public get children() {
        let result = [...this.items] as AbstractModel[];
        if (this.selectAction) {
            result = result.concat(this.selectAction);
        }
        if (this.backgroundImage) {
            result = result.concat(this.backgroundImage);
        }
        return result;
    }
}
