import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class Banner extends React.Component {
    render() {
        return (React.createElement(View, { style: {
                backgroundColor: this.backgroundColor,
                paddingTop: 8,
                paddingRight: 8,
                paddingBottom: 8,
                paddingLeft: 8,
                marginTop: 4,
                marginRight: 4,
                marginBottom: 4,
                marginLeft: 4
            } },
            React.createElement(Text, { style: {
                    color: this.color,
                } }, this.props.title),
            this.props.children));
    }
    get backgroundColor() {
        switch (this.props.level) {
            case 'info':
                return StyleManager.getColor('accent', this.props.theme, false);
            case 'warning':
                return StyleManager.getColor('warning', this.props.theme, false);
            case 'error':
                return StyleManager.getColor('attention', this.props.theme, false);
            case 'success':
                return StyleManager.getColor('good', this.props.theme, false);
            default:
                return StyleManager.getColor('accent', this.props.theme, false);
        }
    }
    get color() {
        return StyleManager.getBackgroundColor(this.props.theme);
    }
}
