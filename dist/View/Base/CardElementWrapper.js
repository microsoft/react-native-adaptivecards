import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import { ActionContext } from '../../Context/ActionContext';
import { InputContext } from '../../Context/InputContext';
import { SeparateLine } from '../Base/SeparateLine';
import { styleManager } from '../Styles/StyleManager';
export class CardElementWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = styleManager.getStyle();
        this.onClick = this.onClick.bind(this);
    }
    render() {
        if (!this.props.cardElement || !this.props.cardElement.isValid()) {
            return null;
        }
        if (this.props.cardElement.supportAction() && this.props.cardElement.getAction() !== undefined) {
            return this.renderActionView();
        }
        return this.renderNonActionView();
    }
    renderActionView() {
        const isHorizontalLayout = styleManager.isHorizontalCardElement(this.props.cardElement.type);
        if (this.props.cardElement.separator) {
            return (React.createElement(TouchableOpacity, { style: this.props.style, onPress: this.onClick },
                this.renderSeparator(this.props.cardElement.spacing, isHorizontalLayout),
                this.renderWrapper(this.props.cardElement.spacing, 0, isHorizontalLayout, { flex: 1 })));
        }
        else {
            return this.renderTouchableWrapper(this.props.cardElement.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }
    renderNonActionView() {
        const isHorizontalLayout = styleManager.isHorizontalCardElement(this.props.cardElement.type);
        if (this.props.cardElement.separator) {
            return (React.createElement(View, { style: this.props.style },
                this.renderSeparator(this.props.cardElement.spacing, isHorizontalLayout),
                this.renderWrapper(this.props.cardElement.spacing, 0, isHorizontalLayout, { flex: 1 })));
        }
        else {
            return this.renderWrapper(this.props.cardElement.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }
    renderTouchableWrapper(spacing, index, isHorizontalLayout, wrapperStyle) {
        return (React.createElement(TouchableOpacity, { style: [
                wrapperStyle,
                styleManager.getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
            ], onPress: this.onClick }, this.props.children));
    }
    renderWrapper(spacing, index, isHorizontalLayout, wrapperStyle) {
        return (React.createElement(View, { style: [
                wrapperStyle,
                styleManager.getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
            ] }, this.props.children));
    }
    renderSeparator(spacing, isHorizontalLayout) {
        return (React.createElement(SeparateLine, { isHorizontal: isHorizontalLayout, margin: styleManager.getCardElementMargin(spacing), color: this.styleConfig.element.separateLineColor }));
    }
    onClick() {
        let actionContext = ActionContext.getInstance();
        let callback = actionContext.getActionEventHandler();
        if (callback) {
            const element = this.props.cardElement;
            if (element.supportAction()) {
                let action = element.getAction();
                if (action) {
                    callback(this.props.cardElement, (args) => {
                        args.formData = Object.assign({}, action.getData(), InputContext.getInstance().getFields(this.props.cardElement.getAllInputFieldIds()));
                        return args;
                    });
                }
            }
        }
    }
}
CardElementWrapper.defaultProps = {
    index: 0,
};
