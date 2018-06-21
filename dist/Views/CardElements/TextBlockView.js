import React from 'react';
import { View, } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { CardText } from '../Basic/CardText';
export class TextBlockView extends React.PureComponent {
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(View, { style: {
                flex: 1,
            } },
            React.createElement(CardText, { style: [
                    this.buildStyle()
                ], numberOfLines: element.maxLines || undefined }, element.text)));
    }
    buildStyle() {
        let styleConfig = StyleManager.getInstance().getStyle(this.props.element);
        return {
            backgroundColor: 'transparent',
            fontSize: styleConfig.fontSize,
            fontWeight: styleConfig.fontWeight,
            color: styleConfig.color,
            textAlign: styleConfig.textAlign,
            flexWrap: styleConfig.wrap,
            marginTop: this.props.index && this.props.index > 0 ? styleConfig.spacing : 0
        };
    }
}
