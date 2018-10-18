import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImage } from '../../Props/Elements/BackgroundImage';
import { BlockNode } from '../Abstract/BlockNode';
import { NodeFactory } from '../NodeFactory';
export class ContainerNode extends BlockNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = SelectableContainerType.Container;
        this.children = [];
        this.style = json.style;
        this.children.push(...NodeFactory.createSet(this, json.items));
        this.height = json.height;
        this.verticalContentAlignment = json.verticalContentAlignment;
        if (json.backgroundImage) {
            this.backgroundImage = new BackgroundImage(json.backgroundImage);
        }
    }
    get items() {
        return this.children;
    }
}
