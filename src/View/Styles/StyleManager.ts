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

export class StyleManager {
    private style: StyleConfig;
    private static sharedInstance: StyleManager;

    private constructor(style = {}) {
        this.style = style;
    }

    public static getInstance() {
        if (StyleManager.sharedInstance === undefined) {
            StyleManager.sharedInstance = new StyleManager(defaultStyle as StyleConfig);
        }
        return StyleManager.sharedInstance;
    }

    public addStyle(overrideStyle: StyleConfig): StyleConfig {
        return merge(this.style, overrideStyle);
    }

    public getStyle(): StyleConfig {
        return this.style;
    }

    public getFontFamily() {
        return Platform.OS === 'ios' ?
            this.style.textBlock.fontFamily.ios :
            this.style.textBlock.fontFamily.android;

    }

    public getImageSetFlexDirectionValue() {
        return this.getFlexDirectionValue(this.style.image.imageSet.direction);
    }

    public getActionSetFlexDirectionValue() {
        return this.getFlexDirectionValue(this.style.action.actionSet.direction);
    }

    public isHorizontalImageSet(): boolean {
        return this.isHorizontalSet(this.style.image.imageSet.direction);
    }

    public isHorizontalActionSet(): boolean {
        return this.isHorizontalSet(this.style.action.actionSet.direction);
    }

    public getImageSize(size: string): number {
        return this.style.image.imageSize[size] || this.style.image.imageSize.medium;
    }

    public getFontSize(size: FontSize): number {
        return this.style.textBlock.fontSize[size] || this.style.textBlock.fontSize[FontSize.Default];
    }

    public getFontWeight(weight: FontWeight) {
        return (this.style.textBlock.fontWeight[weight] || this.style.textBlock.fontWeight[FontWeight.Default]) as
            'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    }

    public getColor(colorName: TextColor): string {
        return this.style.textBlock.textColor[colorName] || this.style.textBlock.textColor[TextColor.Default];
    }

    public getSubtleColor(colorName: TextColor): string {
        return this.style.textBlock.subtleTextColor[colorName] || this.style.textBlock.subtleTextColor[TextColor.Default];
    }

    public getWrapStyle(wrap: boolean) {
        return (wrap ? FlexWrap.Wrap : FlexWrap.NoWrap) as 'wrap' | 'nowrap';
    }

    public isHorizontalCardElement(type: string): boolean {
        return type === ContentElementType.Column ||
            (type === ContentElementType.Image && this.isHorizontalImageSet());
    }

    public getCardElementMargin(spacing: Spacing): number {
        let margin: number = 0;

        if (spacing.toLowerCase() !== Spacing.Padding.toLowerCase()) {
            margin = Utils.isValidValue(this.style.element.spacing[spacing]) ?
                this.style.element.spacing[spacing] :
                this.style.element.spacing[Spacing.Default];
        }

        return margin;
    }

    public getCardElementSpacingStyle(spacing: Spacing, index: number, isHorizontalLayout: boolean): ViewStyle {
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

    public getActionButtonSpacingStyle(index: number) {
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
}
