import React from 'react';
import { View, } from 'react-native';
import styleManager from '../Style/styleManager';
import SeparateLine from './SeparateLine';
export default class CardElementWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = styleManager.getStyle();
    }
    render() {
        const { cardElement, index, style } = this.props;
        if (!cardElement || !cardElement.isValid()) {
            return null;
        }
        const isHorizontalLayout = styleManager.isHorizontalCardElement(cardElement.type);
        if (cardElement.separator) {
            return React.createElement(View, { style: style },
                this.renderSeparator(cardElement.spacing, isHorizontalLayout),
                this.renderWrapper(cardElement.spacing, 0, isHorizontalLayout, { flex: 1 }));
        }
        else {
            return this.renderWrapper(cardElement.spacing, index, isHorizontalLayout, style);
        }
    }
    renderWrapper(spacing, index, isHorizontalLayout, wrapperStyle) {
        return React.createElement(View, { style: [
                wrapperStyle,
                styleManager.getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
            ] }, this.props.children);
    }
    renderSeparator(spacing, isHorizontalLayout) {
        return React.createElement(SeparateLine, { isHorizontal: isHorizontalLayout, margin: styleManager.getCardElementMargin(spacing), color: this.styleConfig.element.separateLineColor });
    }
}
CardElementWrapper.defaultProps = {
    index: 0,
};
