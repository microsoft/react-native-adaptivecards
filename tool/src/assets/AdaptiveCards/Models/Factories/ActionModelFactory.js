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
        switch (json.type) {
            case ActionType.OpenUrl:
                return new OpenUrlActionModel(json, parent, context);
            case ActionType.Submit:
                return new SubmitActionModel(json, parent, context);
            case ActionType.ShowCard:
                return new ShowCardActionModel(json, parent, context);
            case ActionType.Select:
                return new SelectActionModel(json, parent, context);
            default:
                return undefined;
        }
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
