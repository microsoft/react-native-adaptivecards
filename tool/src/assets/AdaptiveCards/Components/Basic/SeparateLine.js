import React from 'react';
import { View } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';
export class SeparateLine extends React.PureComponent {
    render() {
        return (React.createElement(View, { style: {
                backgroundColor: StyleConfig.separatorColor,
                height: StyleConfig.separatorThickness,
                marginVertical: this.margin,
            } }));
    }
    get margin() {
        if (this.props.noMargin) {
            return 0;
        }
        if (this.props.height && this.props.height > 0) {
            return this.props.height / 2;
        }
        else {
            return StyleConfig.separatorSpacing;
        }
    }
}
