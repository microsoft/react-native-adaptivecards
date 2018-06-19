import React from 'react';

import { ActionContext } from '../../Context/ActionContext';
import { OpenUrlActionElement } from '../../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../../Schema/Actions/SubmitAction';
import { ActionElement, ActionType } from '../../Schema/Base/ActionElement';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';
import { IElementViewProps } from '../Shared/BaseProps';

export interface IProps extends IElementViewProps<ActionElement> {
    actionContext?: ActionContext;
}

export class ActionElementView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.getHooks = this.getHooks.bind(this);
    }

    public render() {
        if (this.props.element) {
            switch (this.props.element.getActionType()) {
                case ActionType.OpenUrl:
                    return (
                        <OpenUrlActionView
                            element={this.props.element as OpenUrlActionElement}
                            index={this.props.index}
                            actionHooks={this.getHooks(ActionType.OpenUrl)}
                        />
                    );
                case ActionType.ShowCard:
                    return (
                        <ShowCardActionView
                            element={this.props.element as ShowCardActionElement}
                            index={this.props.index}
                            actionHooks={this.getHooks(ActionType.ShowCard)}
                        />
                    );
                case ActionType.Submit:
                    return (
                        <SubmitActionView
                            element={this.props.element as SubmitActionElement}
                            index={this.props.index}
                            actionHooks={this.getHooks(ActionType.Submit)}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }

    private getHooks(actionType: ActionType) {
        if (this.props.actionContext) {
            let result = this.props.actionContext.getHooks(actionType);
            console.log('Attach hook:' + result);
            return result;
        }
        return undefined;
    }
}
