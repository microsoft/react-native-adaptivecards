import React from 'react';
import { ActionType } from '../../Schema/Abstract/ActionElement';
import { ActionView } from '../Actions/Action';
export class ActionFactory {
    static createAction(element, index, theme, context) {
        if (element) {
            switch (element.type) {
                case ActionType.OpenUrl:
                    return (React.createElement(ActionView, { key: 'OpenUrlActionView' + index, index: index, element: element, theme: theme, actionHooks: this.getHooks(context, element.type) }));
                case ActionType.ShowCard:
                    return (React.createElement(ActionView, { key: 'ShowCardActionView' + index, index: index, element: element, theme: theme, actionHooks: this.getHooks(context, element.type) }));
                case ActionType.Submit:
                    return (React.createElement(ActionView, { key: 'SubmitActionView' + index, index: index, element: element, theme: theme, actionHooks: this.getHooks(context, element.type) }));
                default:
                    return null;
            }
        }
        return null;
    }
    static getHooks(context, actionType) {
        if (context) {
            return context.getHooks(actionType);
        }
        return undefined;
    }
}
