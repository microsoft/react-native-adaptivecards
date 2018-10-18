import { ViewActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { AbstractAction } from '../Abstract/AbstractAction';
import { OpenUrlAction } from './OpenUrlAction';
import { ShowCardAction } from './ShowCardAction';
import { SubmitAction } from './SubmitAction';

export class ActionFactory {
    public static create(node: ViewNode, json: any): AbstractAction {
        if (!json) {
            return undefined;
        }
        // Incase Action.Callback is not a clickable button and could only be used as an internal property,
        // we should not create in this factory.
        switch (json.type) {
            case ViewActionType.OpenUrl:
                return new OpenUrlAction(node, json);
            case ViewActionType.Submit:
                return new SubmitAction(node, json);
            case ViewActionType.ShowCard:
                return new ShowCardAction(node, json);
            default:
                return undefined;
        }
    }

    public static createSet(node: ViewNode, json: any) {
        let actionSet: Array<AbstractAction> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let action: AbstractAction = ActionFactory.create(node, item);
                if (action) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
