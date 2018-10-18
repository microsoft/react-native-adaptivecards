import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
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
                return StyleManager.getColor('accent', this.props.theme, false, this.props.config);
            case 'warning':
                return StyleManager.getColor('warning', this.props.theme, false, this.props.config);
            case 'error':
                return StyleManager.getColor('attention', this.props.theme, false, this.props.config);
            case 'success':
                return StyleManager.getColor('good', this.props.theme, false, this.props.config);
            default:
                return StyleManager.getColor('accent', this.props.theme, false, this.props.config);
        }
    }
    get color() {
        return StyleManager.getColor('light', this.props.theme, false, this.props.config);
    }
}
