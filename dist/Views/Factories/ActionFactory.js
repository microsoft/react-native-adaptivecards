import * as React from 'react';
import { ActionType } from '../../Schema/Base/ActionElement';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';
export class ActionFactory {
    static createView(element, index, actionContext) {
        if (element) {
            switch (element.getActionType()) {
                case ActionType.OpenUrl:
                    return (React.createElement(OpenUrlActionView, { key: 'OpenUrlAction' + index, element: element, index: index, actionHooks: ActionFactory.getHooks(actionContext, ActionType.OpenUrl) }));
                case ActionType.ShowCard:
                    return (React.createElement(ShowCardActionView, { key: 'ShowCardAction' + index, element: element, index: index, actionHooks: ActionFactory.getHooks(actionContext, ActionType.ShowCard) }));
                case ActionType.Submit:
                    return (React.createElement(SubmitActionView, { key: 'SubmitAction' + index, element: element, index: index, actionHooks: ActionFactory.getHooks(actionContext, ActionType.Submit) }));
                default:
                    return null;
            }
        }
        return null;
    }
    static getHooks(actionContext, actionType) {
        if (actionContext) {
            let result = actionContext.getHooks(actionType);
            console.log('Attach hook:' + result);
            return result;
        }
        return undefined;
    }
}
