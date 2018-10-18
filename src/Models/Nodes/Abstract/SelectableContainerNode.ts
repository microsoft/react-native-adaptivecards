import { SelectableContainerType } from '../../../Shared/Types';
import { ActionFactory } from '../../Props/Actions/ActionFactory';
import { OpenUrlAction } from '../../Props/Actions/OpenUrlAction';
import { SubmitAction } from '../../Props/Actions/SubmitAction';
import { BlockNode } from './BlockNode';
import { ViewNode } from './ViewNode';

export abstract class SelectableContainerNode extends BlockNode {
    public abstract readonly type: SelectableContainerType;
    public readonly selectAction: OpenUrlAction | SubmitAction;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.selectAction = ActionFactory.create(this, payload.selectAction) as SubmitAction | OpenUrlAction;
    }
}
