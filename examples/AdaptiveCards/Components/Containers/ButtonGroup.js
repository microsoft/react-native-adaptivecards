import * as React from 'react';
import { View } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';
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
                marginTop: StyleConfig.actionSetSpacing,
                paddingTop: 12,
                justifyContent: 'center',
                borderTopWidth: StyleConfig.separatorThickness,
                borderTopColor: StyleConfig.separatorColor
            };
        }
        return {};
    }
    get flexDirection() {
        return StyleConfig.actionDirection === 'vertically' ? 'column' : 'row';
    }
}
