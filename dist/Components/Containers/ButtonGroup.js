import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class ButtonGroup extends React.Component {
    render() {
        return (React.createElement(View, { style: [
                {
                    flexDirection: this.props.flexDirection,
                    alignSelf: 'stretch',
                },
                this.topStyles
            ] }, this.props.children));
    }
    get topStyles() {
        if (this.props.hasSpacing) {
            return {
                marginTop: StyleManager.actionSetSpacing,
                paddingTop: this.props.flexDirection === 'row' ? 12 : 0,
                justifyContent: 'center',
                borderTopWidth: StyleManager.separatorThickness,
                borderTopColor: StyleManager.separatorColor
            };
        }
        return {};
    }
}
