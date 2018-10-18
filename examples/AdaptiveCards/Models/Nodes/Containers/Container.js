import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImageProp } from '../../Props/Elements/BackgroundImageProp';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { NodeFactory } from '../NodeFactory';
export class ContainerNode extends SelectableContainerNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = SelectableContainerType.Container;
        this.children = [];
        this.style = payload.style;
        this.children.push(...NodeFactory.createSet(this, payload.items));
        this.height = payload.height;
        this.verticalContentAlignment = payload.verticalContentAlignment;
        if (payload.backgroundImage) {
            this.backgroundImage = new BackgroundImageProp(payload.backgroundImage);
        }
    }
    get items() {
        return this.children;
    }
}
