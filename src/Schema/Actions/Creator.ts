import Action from './Action';
import ActionType from './ActionType';
import ActionOpenUrl from './ActionOpenUrl';
import ActionShowCard from './ActionShowCard';
import ActionSubmit from './ActionSubmit';

export function createAction(json: any): Action {
    if (!json) {
        return null;
    }
    let action: Action;
    switch (json.type) {
        case ActionType.OpenUrl:
            action = new ActionOpenUrl(json);
            break;
        case ActionType.Submit:
            action = new ActionSubmit(json);
            break;
        case ActionType.ShowCard:
            action = new ActionShowCard(json);
            break;
        default:
            action = null;
            break;
    }
    return action;
}

export function createActionSet(json: any): Array<Action> {
    let actionSet: Array<Action> = [];
    if (json && json.length > 0) {
        json.forEach((item: any) => {
            let action: Action = createAction(item);
            if (action && action.isValidJSON) {
                actionSet.push(action);
            }
        });
    }
    return actionSet;
}
