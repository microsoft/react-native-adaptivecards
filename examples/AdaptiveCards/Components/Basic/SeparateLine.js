import React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class SeparateLine extends React.Component {
    render() {
        return (React.createElement(View, { style: {
                backgroundColor: StyleManager.getSeparatorColor(this.props.config),
                height: StyleManager.getSeparatorThickness(this.props.config),
                marginVertical: this.margin,
            } }));
    }
    get margin() {
        if (this.props.hasSpacing === false) {
            return 0;
        }
        if (this.props.height && this.props.height > 0) {
            return this.props.height / 2;
        }
        else {
            return StyleManager.getSeparatorSpacing(this.props.config);
        }
    }
}
