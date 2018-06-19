import React from 'react';
import { View, } from 'react-native';
import { CardText } from '../Basic/CardText';
import { DecStyleManager } from '../Styles/DecStyleManager';
export class TextBlockView extends React.PureComponent {
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(View, { style: {
                flex: 1,
            } },
            React.createElement(CardText, { style: {
                    backgroundColor: 'transparent',
                    fontSize: DecStyleManager.getInstance().getFontSize(element.size),
                    fontWeight: DecStyleManager.getInstance().getFontWeight(element.weight),
                    color: element.isSubtle ?
                        DecStyleManager.getInstance().getSubtleColor(element.color) :
                        DecStyleManager.getInstance().getColor(element.color),
                    textAlign: element.horizontalAlignment,
                    flexWrap: DecStyleManager.getInstance().getWrapStyle(element.wrap),
                }, numberOfLines: element.maxLines || undefined }, element.text)));
    }
}
