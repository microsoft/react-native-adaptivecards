import { ViewActionType } from '../../../Shared/Types';
import { OpenUrlAction } from './OpenUrlAction';
import { ShowCardAction } from './ShowCardAction';
import { SubmitAction } from './SubmitAction';
export class ActionFactory {
    static create(node, json) {
        if (!json) {
            return undefined;
        }
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
    static createSet(node, json) {
        let actionSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let action = ActionFactory.create(node, item);
                if (action) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
