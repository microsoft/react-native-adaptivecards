
import { PureActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { AbstractAction } from './AbstractAction';

export abstract class PureAction extends AbstractAction {
    public abstract readonly type: PureActionType;
    public readonly visible = false;

    constructor(node: ViewNode) {
        super(node);
    }
}
