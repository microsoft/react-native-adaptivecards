import React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class SeparateLine extends React.PureComponent {
    render() {
        return (React.createElement(View, { style: {
                backgroundColor: StyleManager.separatorColor,
                height: StyleManager.separatorThickness,
                marginTop: StyleManager.separatorSpacing,
                marginRight: StyleManager.separatorSpacing,
                marginBottom: StyleManager.separatorSpacing,
                marginLeft: StyleManager.separatorSpacing
            } }));
    }
}
