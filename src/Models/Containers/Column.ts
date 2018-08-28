import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ScopeModel } from '../Abstract/ScopeModel';
import { ContentModelFactory } from '../Factories/ContentModelFactory';

export class ColumnModel extends ScopeModel {
    public items: ContentModel[] = [];
    public width: 'auto' | 'stretch' | number;
    public height: 'auto' | 'stretch';
    public verticalContentAlignment: 'top' | 'center' | 'bottom';
    public style: 'default' | 'emphasis';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.style = json.style;
        this.height = json.height;
        this.verticalContentAlignment = json.verticalContentAlignment;
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

    public get children() {
        if (this.selectAction) {
            return [...this.items, this.selectAction];
        }
        return this.items;
    }
}
