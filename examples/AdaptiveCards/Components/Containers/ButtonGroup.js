import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class ButtonGroup extends React.Component {
    render() {
        return (React.createElement(View, { style: [
                {
                    flexDirection: this.flexDirection,
                    alignSelf: 'stretch',
                },
                this.topStyles
            ] }, this.props.children));
    }
    get topStyles() {
        if (this.props.hasSpacing) {
            return {
                marginTop: StyleManager.getActionSetSpacing(this.props.config),
                paddingTop: 12,
                justifyContent: 'center',
                borderTopWidth: StyleManager.getSeparatorThickness(this.props.config),
                borderTopColor: StyleManager.getSeparatorColor(this.props.config),
            };
        }
        return {};
    }
    get flexDirection() {
        return StyleManager.getActionDirection(this.props.config) === 'vertically' ? 'column' : 'row';
    }
}
