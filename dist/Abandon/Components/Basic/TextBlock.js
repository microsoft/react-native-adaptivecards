import React from 'react';
import { Text, } from 'react-native';
export class TextBlock extends React.PureComponent {
    render() {
        return (React.createElement(Text, { style: [
                {
                    color: this.props.color,
                    fontFamily: this.props.fontFamily,
                    fontSize: this.props.fontSize,
                    fontWeight: this.props.fontWeight,
                    flexWrap: this.props.wrap,
                    backgroundColor: this.props.backgroundColor,
                    textAlign: this.props.textAlign,
                },
                this.props.textStyle,
            ], numberOfLines: this.props.numberOfLines, onPress: this.props.onPress }, this.props.children));
    }
}
