import { SelectableContainerType } from '../../../Shared/Types';
import { ActionFactory } from '../../Props/Actions/ActionFactory';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { NodeFactory } from '../NodeFactory';
export class AdaptiveCardNode extends SelectableContainerNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = SelectableContainerType.AdaptiveCard;
        this.children = [];
        this.actions = [];
        this.children.push(...NodeFactory.createSet(this, json.body));
        this.actions.push(...ActionFactory.createSet(this, json.actions));
        this.backgroundImage = json.backgroundImage;
        this.show = true;
    }
    get body() {
        return this.children;
    }
}
