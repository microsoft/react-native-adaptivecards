import React from 'react';

import { ActionContext } from '../../Contexts/ActionContext';
import { ActionElement, ActionType } from '../../Schema/Abstract/ActionElement';
import { ActionView } from '../Actions/Action';

export class ActionFactory {
    public static createAction(element: ActionElement, index: number, theme: 'default' | 'emphasis', context: ActionContext): JSX.Element {
        if (element) {
            return (
                <ActionView 
                    key={element.type + index}
                    index={index}
                    element={element}
                    theme={theme}
                    actionHooks={this.getHooks(context, element.type as ActionType)}
                />
            );
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
