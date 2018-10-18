import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';
export class Banner extends React.Component {
    render() {
        return (React.createElement(View, { style: {
                backgroundColor: this.backgroundColor,
                padding: 8,
                margin: 4,
            } },
            React.createElement(Text, { style: {
                    color: this.color,
                } }, this.props.title),
            this.props.children));
    }
    get backgroundColor() {
        switch (this.props.level) {
            case 'info':
                return StyleConfig.getColor('accent', this.props.theme, false);
            case 'warning':
                return StyleConfig.getColor('warning', this.props.theme, false);
            case 'error':
                return StyleConfig.getColor('attention', this.props.theme, false);
            case 'success':
                return StyleConfig.getColor('good', this.props.theme, false);
            default:
                return StyleConfig.getColor('accent', this.props.theme, false);
        }
    }
    get color() {
        return StyleConfig.getColor('light', this.props.theme, false);
    }
}
