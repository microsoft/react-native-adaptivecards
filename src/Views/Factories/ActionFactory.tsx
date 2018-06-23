import * as React from 'react';
import { ActionContext } from '../../Context/ActionContext';
import { OpenUrlActionElement } from '../../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../../Schema/Actions/SubmitAction';
import { ActionElement, ActionType } from '../../Schema/Base/ActionElement';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';

export class ActionFactory {
    public static createView(element: ActionElement, index: number, actionContext?: ActionContext) {
        if (element) {
            switch (element.getActionType()) {
                case ActionType.OpenUrl:
                    return (
                        <OpenUrlActionView
                            key={'OpenUrlAction' + index}
                            element={element as OpenUrlActionElement}
                            index={index}
                            actionHooks={ActionFactory.getHooks(actionContext, ActionType.OpenUrl)}
                        />
                    );
                case ActionType.ShowCard:
                    return (
                        <ShowCardActionView
                            key={'ShowCardAction' + index}
                            element={element as ShowCardActionElement}
                            index={index}
                            actionHooks={ActionFactory.getHooks(actionContext, ActionType.ShowCard)}
                        />
                    );
                case ActionType.Submit:
                    return (
                        <SubmitActionView
                            key={'SubmitAction' + index}
                            element={element as SubmitActionElement}
                            index={index}
                            actionHooks={ActionFactory.getHooks(actionContext, ActionType.Submit)}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }

    private static getHooks(actionContext: ActionContext, actionType: ActionType) {
        if (actionContext) {
            let result = actionContext.getHooks(actionType);
            console.log('Attach hook:' + result);
            return result;
        }
        return undefined;
    }
}
