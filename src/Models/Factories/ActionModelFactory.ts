import { CardContext } from '../../Contexts/CardContext';
import { ActionType } from '../../Shared/Types';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
import { OpenUrlActionModel } from '../Actions/OpenUrlAction';
import { SelectActionModel } from '../Actions/SelectAction';
import { ShowCardActionModel } from '../Actions/ShowCardAction';
import { SubmitActionModel } from '../Actions/SubmitAction';

export class ActionModelFactory {
    public static create(json: any, parent: AbstractModel, context: CardContext): ActionModel {
        if (!json) {
            return undefined;
        }
        let action: ActionModel;
        // Incase Action.Callback is not a clickable button and could only be used as an internal property,
        // we should not create in this factory.
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

    public static createSet(json: any, parent: AbstractModel, context: CardContext) {
        let actionSet: ActionModel[] = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let action: ActionModel = ActionModelFactory.create(item, parent, context);
                if (action) {
                    actionSet.push(action);
                }
            });
        }
        return actionSet;
    }
}
