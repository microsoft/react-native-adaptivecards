import { ActionElement, ActionType } from '../Abstract/ActionElement';
import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { SelectActionElement } from '../Actions/SelectAction';
import { ShowCardActionElement } from '../Actions/ShowCardAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { IAction } from '../Interfaces/IAction';
import { IElement } from '../Interfaces/IElement';

export class ActionFactory {
    public static create(json: any, parent: IElement): ActionElement {
        if (!json) {
            return undefined;
        }
        let action: ActionElement;
        // Incase Action.Callback is not a clickable button and could only be used as an internal property,
        // we should not create in this factory.
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
            case ActionType.Select:
                action = new SelectActionElement(json, parent);
                break;
            default:
                action = undefined;
                break;
        }
        return action;
    }

    public static createSet(json: any, parent: IElement) {
        let actionSet: IAction[] = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let action: ActionElement = ActionFactory.create(item, parent);
                if (action && action.isValid) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
