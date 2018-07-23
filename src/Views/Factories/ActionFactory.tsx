import { ActionContext } from 'Contexts/ActionContext';
import React from 'react';
import { ActionElement, ActionType } from '../../Schema/Abstract/ActionElement';
import { OpenUrlActionElement } from '../../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../../Schema/Actions/SubmitAction';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';

export class ActionFactory {
    public static createAction(element: ActionElement, vIndex: number, hIndex: number, context: ActionContext): JSX.Element {
        if (element) {
            switch (element.type) {
                case ActionType.OpenUrl:
                    return (
                        <OpenUrlActionView
                            key={'OpenUrlActionView' + hIndex}
                            vIndex={vIndex}
                            hIndex={hIndex}
                            element={element as OpenUrlActionElement}
                            actionHooks={this.getHooks(context, element.type)}
                        />
                    );
                case ActionType.ShowCard:
                    return (
                        <ShowCardActionView
                            key={'ShowCardActionView' + hIndex}
                            vIndex={vIndex}
                            hIndex={hIndex}
                            element={element as ShowCardActionElement}
                            actionHooks={this.getHooks(context, element.type)}
                        />
                    );
                case ActionType.Submit:
                    return (
                        <SubmitActionView
                            key={'SubmitActionView' + hIndex}
                            vIndex={vIndex}
                            hIndex={hIndex}
                            element={element as SubmitActionElement}
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
