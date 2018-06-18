import React from 'react';
import { ActionType } from '../../Schema/Base/ActionElement';
import { OpenUrlActionView } from '../Actions/OpenUrlAction';
import { ShowCardActionView } from '../Actions/ShowCardAction';
import { SubmitActionView } from '../Actions/SubmitAction';
export class ActionElementView extends React.Component {
    constructor(props) {
        super(props);
        this.getHooks = this.getHooks.bind(this);
    }
    render() {
        console.log('Render Action: ' + this.props.element.getActionType());
        switch (this.props.element.getActionType()) {
            case ActionType.OpenUrl:
                return (React.createElement(OpenUrlActionView, { element: this.props.element, index: this.props.index, actionHooks: this.getHooks(ActionType.OpenUrl) }));
            case ActionType.ShowCard:
                return (React.createElement(ShowCardActionView, { element: this.props.element, index: this.props.index, actionHooks: this.getHooks(ActionType.ShowCard) }));
            case ActionType.Submit:
                return (React.createElement(SubmitActionView, { element: this.props.element, index: this.props.index, actionHooks: this.getHooks(ActionType.Submit) }));
            default:
                return undefined;
        }
    }
    getHooks(actionType) {
        if (this.props.actionContext) {
            let result = this.props.actionContext.getHooks(actionType);
            console.log('Attach hook:' + result);
            return result;
        }
        return undefined;
    }
}
