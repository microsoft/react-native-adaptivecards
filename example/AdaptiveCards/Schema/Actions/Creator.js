import ActionType from './ActionType';
import ActionOpenUrl from './ActionOpenUrl';
import ActionShowCard from './ActionShowCard';
import ActionSubmit from './ActionSubmit';
export function createAction(json) {
    if (!json) {
        return null;
    }
    let action;
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
export function createActionSet(json) {
    let actionSet = [];
    if (json && json.length > 0) {
        json.forEach((item) => {
            let action = createAction(item);
            if (action && action.isValidJSON) {
                actionSet.push(action);
            }
        });
    }
    return actionSet;
}
