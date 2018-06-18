import React from 'react';
import { TouchableOpacity, View, } from 'react-native';
import { ActionContext } from '../../Context/ActionContext';
import { SeparateLine } from '../Basic/SeparateLine';
import { StyleManager } from '../Styles/StyleManager';
export class DecCardElementWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = StyleManager.getInstance().getStyle();
        this.onClick = this.onClick.bind(this);
    }
    render() {
        if (!this.props.element || !this.props.element.isValid()) {
            return null;
        }
        if (this.props.element.isForm() && this.props.element.getAction() !== undefined) {
            return this.renderActionView();
        }
        return this.renderNonActionView();
    }
    renderActionView() {
        const isHorizontalLayout = StyleManager.getInstance().isHorizontalCardElement(this.props.element.type);
        if (this.props.element.separator) {
            return (React.createElement(TouchableOpacity, { style: this.props.style, onPress: this.onClick },
                this.renderSeparator(this.props.element.spacing, isHorizontalLayout),
                this.renderWrapper(this.props.element.spacing, 0, isHorizontalLayout, { flex: 1 })));
        }
        else {
            return this.renderTouchableWrapper(this.props.element.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }
    renderNonActionView() {
        const isHorizontalLayout = StyleManager.getInstance().isHorizontalCardElement(this.props.element.type);
        if (this.props.element.separator) {
            return (React.createElement(View, { style: this.props.style },
                this.renderSeparator(this.props.element.spacing, isHorizontalLayout),
                this.renderWrapper(this.props.element.spacing, 0, isHorizontalLayout, { flex: 1 })));
        }
        else {
            return this.renderWrapper(this.props.element.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }
    renderTouchableWrapper(spacing, index, isHorizontalLayout, wrapperStyle) {
        return (React.createElement(TouchableOpacity, { style: [
                wrapperStyle,
                StyleManager.getInstance().getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
            ], onPress: this.onClick }, this.props.children));
    }
    renderWrapper(spacing, index, isHorizontalLayout, wrapperStyle) {
        return (React.createElement(View, { style: [
                wrapperStyle,
                StyleManager.getInstance().getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
            ] }, this.props.children));
    }
    renderSeparator(spacing, isHorizontalLayout) {
        return (React.createElement(SeparateLine, { isHorizontal: isHorizontalLayout, margin: StyleManager.getInstance().getCardElementMargin(spacing), color: this.styleConfig.element.separateLineColor }));
    }
    onClick() {
        let actionContext = ActionContext.getGlobalInstance();
        let callback = actionContext.getActionEventHandler(this.props.element.getAction());
        if (callback) {
            const element = this.props.element;
            if (element.isForm()) {
                let action = element.getAction();
                if (action) {
                    callback();
                }
            }
        }
    }
}
