import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class ButtonGroup extends React.Component {
    render() {
        return (React.createElement(View, { style: {
                flexDirection: this.flexDirection,
                alignSelf: 'stretch',
                marginTop: StyleManager.actionSetSpacing,
                paddingTop: 12,
                justifyContent: 'center',
                borderTopWidth: StyleManager.separatorThickness,
                borderTopColor: StyleManager.separatorColor
            } }, this.props.children));
    }
    get flexDirection() {
        return StyleManager.actionDirection === 'vertically' ? 'column' : 'row';
    }
}
