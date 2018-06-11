import { ActionElement } from './Action';
import { ActionType } from './ActionType';
import { OpenUrlActionElement } from './OpenUrlAction';
import { ShowCardActionElement } from './ShowCardAction';
import { SubmitActionElement } from './SubmitAction';

export class ActionFactory {
    public static create(json: any): ActionElement {
        if (!json) {
            return undefined;
        }
        let action: ActionElement;
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

    public static createSet(json: any): Array<ActionElement> {
        let actionSet: Array<ActionElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let action: ActionElement = ActionFactory.create(item);
                if (action && action.isValidJSON) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
