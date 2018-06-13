import merge from 'lodash/merge';
import { Platform, } from 'react-native';
import { ContentElementType } from '../../Schema/Base/ContentElement';
import { FlexDirection, FlexWrap, FontSize, FontWeight, Spacing, TextColor, } from '../../Schema/Base/Enums';
import { Utils } from '../../utils';
const defaultStyle = require('./DefaultStyle.json');
class StyleManager {
    constructor(style = {}) {
        this.style = style;
    }
    addStyle(overrideStyle) {
        return merge(this.style, overrideStyle);
    }
    getStyle() {
        return this.style;
    }
    getFontFamily() {
        return Platform.OS === 'ios' ?
            this.style.textBlock.fontFamily.ios :
            this.style.textBlock.fontFamily.android;
    }
    getFlexDirectionValue(direction) {
        let directionStyle;
        switch (direction.toLowerCase()) {
            case FlexDirection.Row:
            default:
                directionStyle = FlexDirection.Row;
                break;
            case FlexDirection.Column:
                directionStyle = FlexDirection.Column;
                break;
        }
        return directionStyle;
    }
    isHorizontalSet(direction) {
        if (direction.toLowerCase() === FlexDirection.Column.toLowerCase()) {
            return false;
        }
        return true;
    }
    getImageSetFlexDirectionValue() {
        return this.getFlexDirectionValue(this.style.image.imageSet.direction);
    }
    getActionSetFlexDirectionValue() {
        return this.getFlexDirectionValue(this.style.action.actionSet.direction);
    }
    isHorizontalImageSet() {
        return this.isHorizontalSet(this.style.image.imageSet.direction);
    }
    isHorizontalActionSet() {
        return this.isHorizontalSet(this.style.action.actionSet.direction);
    }
    getImageSize(size) {
        return this.style.image.imageSize[size] || this.style.image.imageSize.medium;
    }
    getFontSize(size) {
        return this.style.textBlock.fontSize[size] || this.style.textBlock.fontSize[FontSize.Default];
    }
    getFontWeight(weight) {
        return (this.style.textBlock.fontWeight[weight] || this.style.textBlock.fontWeight[FontWeight.Default]);
    }
    getColor(colorName) {
        return this.style.textBlock.textColor[colorName] || this.style.textBlock.textColor[TextColor.Default];
    }
    getSubtleColor(colorName) {
        return this.style.textBlock.subtleTextColor[colorName] || this.style.textBlock.subtleTextColor[TextColor.Default];
    }
    getWrapStyle(wrap) {
        return (wrap ? FlexWrap.Wrap : FlexWrap.NoWrap);
    }
    isHorizontalCardElement(type) {
        return type === ContentElementType.Column ||
            (type === ContentElementType.Image && this.isHorizontalImageSet());
    }
    getCardElementMargin(spacing) {
        let margin = 0;
        if (spacing.toLowerCase() !== Spacing.Padding.toLowerCase()) {
            margin = Utils.isValidValue(this.style.element.spacing[spacing]) ?
                this.style.element.spacing[spacing] :
                this.style.element.spacing[Spacing.Default];
        }
        return margin;
    }
    getCardElementSpacingStyle(spacing, index, isHorizontalLayout) {
        if (spacing === Spacing.Padding) {
            return {
                padding: this.style.element.spacing.padding
            };
        }
        else {
            let margin = 0;
            if (index > 0) {
                margin = this.getCardElementMargin(spacing);
            }
            if (isHorizontalLayout) {
                return {
                    marginLeft: margin
                };
            }
            else {
                return {
                    marginTop: margin
                };
            }
        }
    }
    getActionButtonSpacingStyle(index) {
        if (index > 0) {
            if (this.isHorizontalActionSet()) {
                return {
                    marginLeft: this.style.action.button.spacing,
                };
            }
            else {
                return {
                    marginTop: this.style.action.button.spacing,
                };
            }
        }
        return;
    }
}
export const styleManager = new StyleManager(defaultStyle);
