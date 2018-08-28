import { ContentModel } from '../Abstract/ContentModel';
import { ActionModelFactory } from '../Factories/ActionModelFactory';
import { ContentModelFactory } from '../Factories/ContentModelFactory';
export class CardModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.body = [];
        this.actions = [];
        this.actions = ActionModelFactory.createSet(json.actions, this, this.context);
        this.body = ContentModelFactory.createSet(json.body, this, this.context);
        this.backgroundImage = json.backgroundImage;
        if (this.backgroundImage) {
            this.context.fit = 'background';
        }
    }
    get children() {
        return [...this.body, ...this.actions];
    }
}
