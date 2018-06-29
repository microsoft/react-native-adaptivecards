import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { ActionContext } from '../../Contexts/ActionContext';
export class SubmitActionView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = () => {
            console.log('SubmitAction pressed');
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element);
            if (callback) {
                if (this.props.actionHooks) {
                    callback(...this.props.actionHooks);
                }
                else {
                    callback();
                }
            }
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(Button, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, title: this.props.element.title, onPress: this.onPress }));
    }
}
