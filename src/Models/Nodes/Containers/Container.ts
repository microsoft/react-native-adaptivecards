import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImageProp } from '../../Props/Elements/BackgroundImageProp';
import { BlockNode } from '../Abstract/BlockNode';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ViewNode } from '../Abstract/ViewNode';
import { NodeFactory } from '../NodeFactory';

export class ContainerNode extends SelectableContainerNode {
    public readonly type = SelectableContainerType.Container;
    public readonly children: BlockNode[] = [];
    public readonly height: 'auto' | 'stretch';
    public readonly verticalContentAlignment: 'top' | 'center' | 'bottom';
    public readonly style: 'default' | 'emphasis';
    public readonly backgroundImage: BackgroundImageProp;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.style = payload.style;
        this.children.push(...NodeFactory.createSet(this, payload.items));
        this.height = payload.height;
        this.verticalContentAlignment = payload.verticalContentAlignment;

        if (payload.backgroundImage) {
            this.backgroundImage = new BackgroundImageProp(payload.backgroundImage);
        }
    }

    public get items(): BlockNode[] {
        return this.children;
    }
}
