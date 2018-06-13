import React from 'react';
import { View, } from 'react-native';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { CardText } from '../Base/CardText';
import { styleManager } from '../Styles/StyleManager';
export class TextBlockView extends React.PureComponent {
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(CardElementWrapper, { element: element, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: {
                    flex: 1,
                } },
                React.createElement(CardText, { style: {
                        backgroundColor: 'transparent',
                        fontSize: styleManager.getFontSize(element.size),
                        fontWeight: styleManager.getFontWeight(element.weight),
                        color: element.isSubtle ?
                            styleManager.getSubtleColor(element.color) :
                            styleManager.getColor(element.color),
                        textAlign: element.horizontalAlignment,
                        flexWrap: styleManager.getWrapStyle(element.wrap),
                    }, numberOfLines: element.maxLines || undefined }, element.text))));
    }
}
