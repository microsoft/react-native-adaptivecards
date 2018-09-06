import { ScopeModel } from '../Abstract/ScopeModel';
import { ContentModelFactory } from '../Factories/ContentModelFactory';
export class ContainerModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.items = [];
        this.style = json.style;
        this.items = ContentModelFactory.createSet(json.items, this, this.context);
        this.height = json.height;
        this.verticalContentAlignment = json.verticalContentAlignment;
    }
    get children() {
        if (this.selectAction) {
            return [...this.items, this.selectAction];
        }
        return this.items;
    }
}
