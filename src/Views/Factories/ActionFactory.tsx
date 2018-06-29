import { ActionContext } from 'Contexts/ActionContext';
import React from 'react';
import { OpenUrlActionElement } from '../../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../../Schema/Actions/SubmitAction';
import { ActionElement, ActionType } from '../../Schema/Base/ActionElement';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';

export class ActionFactory {
    public static createAction(element: ActionElement, index: number, context: ActionContext): JSX.Element {
        if (element) {
            switch (element.type) {
                case ActionType.OpenUrl:
                    return (
                        <OpenUrlActionView
                            key={'OpenUrlActionView' + index}
                            vIndex={0}
                            hIndex={index}
                            element={element as OpenUrlActionElement}
                            actionHooks={this.getHooks(context, element.getActionType())}
                        />
                    );
                case ActionType.ShowCard:
                    return (
                        <ShowCardActionView
                            key={'ShowCardActionView' + index}
                            vIndex={0}
                            hIndex={index}
                            element={element as ShowCardActionElement}
                            actionHooks={this.getHooks(context, element.getActionType())}
                        />
                    );
                case ActionType.Submit:
                    return (
                        <SubmitActionView
                            key={'SubmitActionView' + index}
                            vIndex={0}
                            hIndex={index}
                            element={element as SubmitActionElement}
                            actionHooks={this.getHooks(context, element.getActionType())}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }

    private static getHooks(context: ActionContext, actionType: ActionType) {
        if (context) {
            return context.getHooks(actionType);
        }
        return undefined;
    }
}
