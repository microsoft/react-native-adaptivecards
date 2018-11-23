import { ViewActionType } from '../../../Shared/Types';
import { OpenUrlAction } from './OpenUrlAction';
import { ShowCardAction } from './ShowCardAction';
import { SubmitAction } from './SubmitAction';
export class ActionFactory {
    static create(node, payload) {
        if (!payload) {
            return undefined;
        }
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
    static createSet(node, payload) {
        let actionSet = [];
        if (payload && payload.length > 0) {
            payload.forEach((item) => {
                let action = ActionFactory.create(node, item);
                if (action) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
