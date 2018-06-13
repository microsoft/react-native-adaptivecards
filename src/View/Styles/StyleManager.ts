import merge from 'lodash/merge';
import {
    Platform,
    ViewStyle,
} from 'react-native';

import { ContentElementType } from '../../Schema/Base/ContentElement';
import {
    FlexDirection,
    FlexWrap,
    FontSize,
    FontWeight,
    Spacing,
    TextColor,
} from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { StyleConfig } from './StyleConfig';

const defaultStyle = require('./DefaultStyle.json');

class StyleManager {
    private style: StyleConfig;

    constructor(style = {}) {
        this.style = style;
    }

    addStyle(overrideStyle: StyleConfig): StyleConfig {
        return merge(this.style, overrideStyle);
    }

    getStyle(): StyleConfig {
        return this.style;
    }

    getFontFamily() {
        return Platform.OS === 'ios' ?
            this.style.textBlock.fontFamily.ios :
            this.style.textBlock.fontFamily.android;

    }

    private getFlexDirectionValue(direction: string) {
        let directionStyle: 'row' | 'column';

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

    private isHorizontalSet(direction: string): boolean {
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

    isHorizontalImageSet(): boolean {
        return this.isHorizontalSet(this.style.image.imageSet.direction);
    }

    isHorizontalActionSet(): boolean {
        return this.isHorizontalSet(this.style.action.actionSet.direction);
    }

    getImageSize(size: string): number {
        return this.style.image.imageSize[size] || this.style.image.imageSize.medium;
    }

    getFontSize(size: FontSize): number {
        return this.style.textBlock.fontSize[size] || this.style.textBlock.fontSize[FontSize.Default];
    }

    getFontWeight(weight: FontWeight) {
        return (this.style.textBlock.fontWeight[weight] || this.style.textBlock.fontWeight[FontWeight.Default]) as
            'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    }

    getColor(colorName: TextColor): string {
        return this.style.textBlock.textColor[colorName] || this.style.textBlock.textColor[TextColor.Default];
    }

    getSubtleColor(colorName: TextColor): string {
        return this.style.textBlock.subtleTextColor[colorName] || this.style.textBlock.subtleTextColor[TextColor.Default];
    }

    getWrapStyle(wrap: boolean) {
        return (wrap ? FlexWrap.Wrap : FlexWrap.NoWrap) as 'wrap' | 'nowrap';
    }

    isHorizontalCardElement(type: string): boolean {
        return type === ContentElementType.Column ||
            (type === ContentElementType.Image && this.isHorizontalImageSet());
    }

    getCardElementMargin(spacing: Spacing): number {
        let margin: number = 0;

        if (spacing.toLowerCase() !== Spacing.Padding.toLowerCase()) {
            margin = Utils.isValidValue(this.style.element.spacing[spacing]) ?
                this.style.element.spacing[spacing] :
                this.style.element.spacing[Spacing.Default];
        }

        return margin;
    }

    getCardElementSpacingStyle(spacing: Spacing, index: number, isHorizontalLayout: boolean): ViewStyle {
        if (spacing === Spacing.Padding) {
            return {
                padding: this.style.element.spacing.padding
            };
        } else {
            let margin: number = 0;
            if (index > 0) {
                margin = this.getCardElementMargin(spacing);
            }
            if (isHorizontalLayout) {
                return {
                    marginLeft: margin
                };
            } else {
                return {
                    marginTop: margin
                };
            }
        }
    }

    getActionButtonSpacingStyle(index: number) {
        if (index > 0) {
            if (this.isHorizontalActionSet()) {
                return {
                    marginLeft: this.style.action.button.spacing,
                };
            } else {
                return {
                    marginTop: this.style.action.button.spacing,
                };
            }
        }

        return;
    }
}

export const styleManager = new StyleManager(defaultStyle as StyleConfig);
