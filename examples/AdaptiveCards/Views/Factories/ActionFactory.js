import React from 'react';
import { ActionType } from '../../Schema/Abstract/ActionElement';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';
export class ActionFactory {
    static createAction(element, vIndex, hIndex, context) {
        if (element) {
            switch (element.type) {
                case ActionType.OpenUrl:
                    return (React.createElement(OpenUrlActionView, { key: 'OpenUrlActionView' + hIndex, vIndex: vIndex, hIndex: hIndex, element: element, actionHooks: this.getHooks(context, element.type) }));
                case ActionType.ShowCard:
                    return (React.createElement(ShowCardActionView, { key: 'ShowCardActionView' + hIndex, vIndex: vIndex, hIndex: hIndex, element: element, actionHooks: this.getHooks(context, element.type) }));
                case ActionType.Submit:
                    return (React.createElement(SubmitActionView, { key: 'SubmitActionView' + hIndex, vIndex: vIndex, hIndex: hIndex, element: element, actionHooks: this.getHooks(context, element.type) }));
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
