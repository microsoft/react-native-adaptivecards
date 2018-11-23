import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
export class SelectActionView extends React.Component {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            const { model, context } = this.props;
            if (model && context && model.onAction) {
                model.onAction(context);
            }
        };
        this.onLayout = (event) => {
            if (this.props.onLayout) {
                this.props.onLayout(event);
            }
        };
    }
    render() {
        const { model, children, style } = this.props;
        if (model) {
            return (React.createElement(Touchable, { disabled: !model.enabled, onPress: this.onPress, onLayout: this.onLayout, style: style }, children));
        }
        else {
            return (React.createElement(View, { onLayout: this.onLayout, style: style }, children));
        }
    }
}
