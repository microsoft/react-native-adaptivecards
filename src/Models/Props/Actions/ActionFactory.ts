import { ViewActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { AbstractAction } from '../Abstract/AbstractAction';
import { OpenUrlAction } from './OpenUrlAction';
import { ShowCardAction } from './ShowCardAction';
import { SubmitAction } from './SubmitAction';

export class ActionFactory {
    public static create(node: ViewNode, payload: any): AbstractAction {
        if (!payload) {
            return undefined;
        }
        // Incase Action.Callback is not a clickable button and could only be used as an internal property,
        // we should not create in this factory.
        switch (payload.type) {
            case ViewActionType.OpenUrl:
                return new OpenUrlAction(node, payload);
            case ViewActionType.Submit:
                return new SubmitAction(node, payload);
            case ViewActionType.ShowCard:
                return new ShowCardAction(node, payload);
            default:
                return undefined;
        }
    }

    public static createSet(node: ViewNode, payload: any) {
        let actionSet: Array<AbstractAction> = [];
        if (payload && payload.length > 0) {
            payload.forEach((item: any) => {
                let action: AbstractAction = ActionFactory.create(node, item);
                if (action) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
