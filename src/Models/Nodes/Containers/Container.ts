import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImage } from '../../Props/Elements/BackgroundImage';
import { BlockNode } from '../Abstract/BlockNode';
import { ViewNode } from '../Abstract/ViewNode';
import { NodeFactory } from '../NodeFactory';

export class ContainerNode extends BlockNode {
    public readonly type = SelectableContainerType.Container;
    public readonly children: BlockNode[] = [];
    public readonly height: 'auto' | 'stretch';
    public readonly verticalContentAlignment: 'top' | 'center' | 'bottom';
    public readonly style: 'default' | 'emphasis';
    public readonly backgroundImage: BackgroundImage;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.style = json.style;
        this.children.push(...NodeFactory.createSet(this, json.items));
        this.height = json.height;
        this.verticalContentAlignment = json.verticalContentAlignment;

        if (json.backgroundImage) {
            this.backgroundImage = new BackgroundImage(json.backgroundImage);
        }
    }

    public get items(): BlockNode[] {
        return this.children;
    }
}
