import React from 'react';
import { ActionView } from '../Actions/Action';
export class ActionFactory {
    static createAction(element, index, theme, context) {
        if (element) {
            return (React.createElement(ActionView, { key: element.type + index, index: index, element: element, theme: theme, actionHooks: this.getHooks(context, element.type) }));
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
