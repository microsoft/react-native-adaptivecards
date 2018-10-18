import { ActionFactory } from '../../Props/Actions/ActionFactory';
import { BlockNode } from './BlockNode';
export class SelectableContainerNode extends BlockNode {
    constructor(parent, json) {
        super(parent, json);
        this.selectAction = ActionFactory.create(this, json.selectAction);
    }
}
