import { CardContext } from '../../../Contexts/CardContext';
import { ActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';

export abstract class AbstractAction {
    public abstract readonly type: ActionType;
    public abstract readonly visible: boolean;
    public abstract readonly param: object;
    public readonly node: ViewNode;

    constructor(node: ViewNode) {
        this.node = node;
    }

    public abstract onAction(context: CardContext): void;
}
