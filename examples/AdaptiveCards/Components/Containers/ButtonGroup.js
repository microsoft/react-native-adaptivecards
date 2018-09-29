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
                marginTop: StyleManager.actionSetSpacing,
                paddingTop: 12,
                justifyContent: 'center',
                borderTopWidth: StyleManager.separatorThickness,
                borderTopColor: StyleManager.separatorColor
            };
        }
        return {};
    }
    get flexDirection() {
        return StyleManager.actionDirection === 'vertically' ? 'column' : 'row';
    }
}
