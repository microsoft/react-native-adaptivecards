import { ActionType } from '../../Shared/Types';
import { OpenUrlActionModel } from '../Actions/OpenUrlAction';
import { SelectActionModel } from '../Actions/SelectAction';
import { ShowCardActionModel } from '../Actions/ShowCardAction';
import { SubmitActionModel } from '../Actions/SubmitAction';
export class ActionModelFactory {
    static create(json, parent, context) {
        if (!json) {
            return undefined;
        }
        let action;
        switch (json.type) {
            case ActionType.OpenUrl:
                action = new OpenUrlActionModel(json, parent, context);
                break;
            case ActionType.Submit:
                action = new SubmitActionModel(json, parent, context);
                break;
            case ActionType.ShowCard:
                action = new ShowCardActionModel(json, parent, context);
                break;
            case ActionType.Select:
                action = new SelectActionModel(json, parent, context);
                break;
            default:
                action = undefined;
                break;
        }
        return action;
    }
    static createSet(json, parent, context) {
        let actionSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let action = ActionModelFactory.create(item, parent, context);
                if (action) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
