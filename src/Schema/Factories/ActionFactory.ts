import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Actions/ShowCardAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement, ActionType } from '../Base/ActionElement';

export class ActionFactory {
    public static create(json: any, parent: AbstractElement): ActionElement {
        if (!json) {
            return undefined;
        }
        let action: ActionElement;
        switch (json.type) {
            case ActionType.OpenUrl:
                action = new OpenUrlActionElement(json, parent);
                break;
            case ActionType.Submit:
                action = new SubmitActionElement(json, parent);
                break;
            case ActionType.ShowCard:
                action = new ShowCardActionElement(json, parent);
                break;
            default:
                action = undefined;
                break;
        }
        return action;
    }

    public static createSet(json: any, parent: AbstractElement): Array<ActionElement> {
        let actionSet: Array<ActionElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let action: ActionElement = ActionFactory.create(item, parent);
                if (action && action.isValidJSON) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
