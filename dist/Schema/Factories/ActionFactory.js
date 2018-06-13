import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Actions/ShowCardAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { ActionType } from '../Base/ActionElement';
export class ActionFactory {
    static create(json) {
        if (!json) {
            return undefined;
        }
        let action;
        switch (json.type) {
            case ActionType.OpenUrl:
                action = new OpenUrlActionElement(json);
                break;
            case ActionType.Submit:
                action = new SubmitActionElement(json);
                break;
            case ActionType.ShowCard:
                action = new ShowCardActionElement(json);
                break;
            default:
                action = undefined;
                break;
        }
        return action;
    }
    static createSet(json) {
        let actionSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let action = ActionFactory.create(item);
                if (action && action.isValidJSON) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
