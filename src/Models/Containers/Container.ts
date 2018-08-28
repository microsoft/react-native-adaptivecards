import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ScopeModel } from '../Abstract/ScopeModel';
import { ContentModelFactory } from '../Factories/ContentModelFactory';

export class ContainerModel extends ScopeModel {
    public items: ContentModel[] = [];
    public height: 'auto' | 'stretch';
    public verticalContentAlignment: 'top' | 'center' | 'bottom';
    public style: 'default' | 'emphasis';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.style = json.style;
        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.height = json.height;
        this.verticalContentAlignment = json.verticalContentAlignment;

    }

    public get children() {
        if (this.selectAction) {
            return [...this.items, this.selectAction];
        }
        return this.items;
    }
}
