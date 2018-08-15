import React from 'react';

import { ActionContext } from '../../Contexts/ActionContext';
import { ActionElement, ActionType } from '../../Schema/Abstract/ActionElement';
import { OpenUrlActionElement } from '../../Schema/Actions/OpenUrlAction';
import { ActionView } from '../Actions/Action';

export class ActionFactory {
    public static createAction(element: ActionElement, index: number, theme: 'default' | 'emphasis', context: ActionContext): JSX.Element {
        if (element) {
            switch (element.type) {
                case ActionType.OpenUrl:
                    return (
                        <ActionView
                            key={'OpenUrlActionView' + index}
                            index={index}
                            element={element as OpenUrlActionElement}
                            theme={theme}
                            actionHooks={this.getHooks(context, element.type)}
                        />
                    );
                case ActionType.ShowCard:
                    return (
                        <ActionView
                            key={'ShowCardActionView' + index}
                            index={index}
                            element={element as OpenUrlActionElement}
                            theme={theme}
                            actionHooks={this.getHooks(context, element.type)}
                        />
                    );
                case ActionType.Submit:
                    return (
                        <ActionView
                            key={'SubmitActionView' + index}
                            index={index}
                            element={element as OpenUrlActionElement}
                            theme={theme}
                            actionHooks={this.getHooks(context, element.type)}
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
