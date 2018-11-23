import { ActionFactory } from '../../Props/Actions/ActionFactory';
import { BlockNode } from './BlockNode';
export class SelectableContainerNode extends BlockNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.selectAction = ActionFactory.create(this, payload.selectAction);
    }
}
