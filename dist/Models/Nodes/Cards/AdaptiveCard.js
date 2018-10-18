import { SelectableContainerType } from '../../../Shared/Types';
import { ActionFactory } from '../../Props/Actions/ActionFactory';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { NodeFactory } from '../NodeFactory';
export class AdaptiveCardNode extends SelectableContainerNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = SelectableContainerType.AdaptiveCard;
        this.children = [];
        this.actions = [];
        this.children.push(...NodeFactory.createSet(this, payload.body));
        this.actions.push(...ActionFactory.createSet(this, payload.actions));
        this.backgroundImage = payload.backgroundImage;
        this.show = true;
    }
    get body() {
        return this.children;
    }
}
