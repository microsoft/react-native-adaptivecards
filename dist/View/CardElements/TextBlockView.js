import React from 'react';
import { View, } from 'react-native';
import { CardText } from '../Basic/CardText';
import { DecCardElementWrapper } from '../Basic/DecCardElementWrapper';
import { StyleManager } from '../Styles/StyleManager';
export class TextBlockView extends React.PureComponent {
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(DecCardElementWrapper, { element: element, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: {
                    flex: 1,
                } },
                React.createElement(CardText, { style: {
                        backgroundColor: 'transparent',
                        fontSize: StyleManager.getInstance().getFontSize(element.size),
                        fontWeight: StyleManager.getInstance().getFontWeight(element.weight),
                        color: element.isSubtle ?
                            StyleManager.getInstance().getSubtleColor(element.color) :
                            StyleManager.getInstance().getColor(element.color),
                        textAlign: element.horizontalAlignment,
                        flexWrap: StyleManager.getInstance().getWrapStyle(element.wrap),
                    }, numberOfLines: element.maxLines || undefined }, element.text))));
    }
}
