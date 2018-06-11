import React from 'react';
import { View, } from 'react-native';
import { AdaptiveCardText } from '../Shared/AdaptiveCardText';
import { CardElementWrapper } from '../Shared/CardElementWrapper';
import { styleManager } from '../Styles/StyleManager';
export class TextBlockView extends React.PureComponent {
    render() {
        const { textBlock, index } = this.props;
        if (!textBlock || !textBlock.isValid()) {
            return null;
        }
        return React.createElement(CardElementWrapper, { cardElement: textBlock, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: {
                    flex: 1,
                } },
                React.createElement(AdaptiveCardText, { style: {
                        backgroundColor: 'transparent',
                        fontSize: styleManager.getFontSize(textBlock.size),
                        fontWeight: styleManager.getFontWeight(textBlock.weight),
                        color: textBlock.isSubtle ? styleManager.getSubtleColor(textBlock.color) : styleManager.getColor(textBlock.color),
                        textAlign: textBlock.horizontalAlignment,
                        flexWrap: styleManager.getWrapStyle(textBlock.wrap),
                    }, numberOfLines: textBlock.maxLines || undefined }, textBlock.text)));
    }
}
