import { SelectableContainerType } from '../../../Shared/Types';
import { ViewAction } from '../../Props/Abstract/ViewAction';
import { ActionFactory } from '../../Props/Actions/ActionFactory';
import { BlockNode } from '../Abstract/BlockNode';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ViewNode } from '../Abstract/ViewNode';
import { NodeFactory } from '../NodeFactory';

export class AdaptiveCardNode extends SelectableContainerNode {
    public readonly type =  SelectableContainerType.AdaptiveCard;
    public readonly children: BlockNode[] = [];
    public readonly actions: ViewAction[] = [];
    public readonly backgroundImage: string;
    public show: boolean;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.children.push(...NodeFactory.createSet(this, payload.body));
        this.actions.push(...(ActionFactory.createSet(this, payload.actions) as ViewAction[]));
        this.backgroundImage = payload.backgroundImage;
        this.show = true;
    }

    public get body() {
        return this.children;
    }
}
