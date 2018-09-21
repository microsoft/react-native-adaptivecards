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
        // Incase Action.Callback is not a clickable button and could only be used as an internal property,
        // we should not create in this factory.
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
