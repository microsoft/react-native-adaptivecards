import * as React from 'react';
import { Button } from '../../Abandon/Components/Inputs/Button';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
export class OpenUrlActionView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = () => {
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
        if (!element || !element.isValid) {
            return null;
        }
        const hostStyle = StyleManager.getInstance().getActionStyle();
        return (React.createElement(Button, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, vSpacing: hostStyle.marginTop, hSpacing: hostStyle.marginLeft, title: this.title, onPress: this.onPress, color: 'white', backgroundColor: '#277BDF', borderColor: '#277BDF', borderRadius: 4, textAlign: 'center' }));
    }
    get title() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return '';
        }
        return this.props.element.title ? this.props.element.title : '';
    }
}
