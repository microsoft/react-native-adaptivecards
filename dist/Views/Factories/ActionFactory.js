import React from 'react';
import { ActionType } from '../../Schema/Base/ActionElement';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';
export class ActionFactory {
    static createAction(element, index, context) {
        if (element) {
            switch (element.type) {
                case ActionType.OpenUrl:
                    return (React.createElement(OpenUrlActionView, { key: 'OpenUrlActionView' + index, vIndex: 0, hIndex: index, element: element, actionHooks: this.getHooks(context, element.getActionType()) }));
                case ActionType.ShowCard:
                    return (React.createElement(ShowCardActionView, { key: 'ShowCardActionView' + index, vIndex: 0, hIndex: index, element: element, actionHooks: this.getHooks(context, element.getActionType()) }));
                case ActionType.Submit:
                    return (React.createElement(SubmitActionView, { key: 'SubmitActionView' + index, vIndex: 0, hIndex: index, element: element, actionHooks: this.getHooks(context, element.getActionType()) }));
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
