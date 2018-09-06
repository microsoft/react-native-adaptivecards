import { ActionModelFactory } from '../Factories/ActionModelFactory';
import { ContentModel } from './ContentModel';
export class ScopeModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.selectAction = ActionModelFactory.create(json.selectAction, this, this.context);
    }
}
