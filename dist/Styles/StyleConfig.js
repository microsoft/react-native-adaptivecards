import { StyleSheet } from 'react-native';
import { Host } from '../Contexts/Host';
export class StyleConfig {
    static getSpacing(spacing) {
        if (spacing === 'none') {
            return 0;
        }
        let config = Host.getInstance().getConfig();
        let spacingConfig = config.spacing[spacing];
        if (!spacingConfig) {
            return config.spacing.default;
        }
        return spacingConfig;
    }
    static getFontSize(size) {
        let config = Host.getInstance().getConfig();
        let fontSize = config.fontSize[size];
        if (!fontSize) {
            return config.fontSize.default;
        }
        return fontSize;
    }
    static getFontWeight(weight) {
        let config = Host.getInstance().getConfig();
        let fontWeight = config.fontWeight[weight];
        if (!fontWeight) {
            return config.fontWeight.default;
        }
        return fontWeight;
    }
    static getTextAlign(align) {
        if (align === 'left' || align === 'center' || align === 'right') {
            return align;
        }
        return 'left';
    }
    static getHorizontalAlign(align) {
        switch (align) {
            case 'left':
                return 'flex-start';
            case 'right':
                return 'flex-end';
            case 'center':
                return 'center';
            default:
                return 'center';
        }
    }
    static getWrap(wrap) {
        if (wrap) {
            return 'wrap';
        }
        return 'nowrap';
    }
    static getImageSize(size) {
        let config = Host.getInstance().getConfig();
        if (size === undefined) {
            return 'auto';
        }
        if (size === 'small' || size === 'medium' || size === 'large') {
            return config.imageSize[size];
        }
        return size;
    }
    static getColor(color, theme, isSubtle) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.container[theme];
        if (!themeConfig) {
            themeConfig = config.container.default;
        }
        let colorConfig = themeConfig.foreground[color];
        if (!colorConfig) {
            colorConfig = themeConfig.foreground.default;
        }
        if (isSubtle) {
            return colorConfig.subtle;
        }
        else {
            return colorConfig.default;
        }
    }
    static getBackgroundColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.container[theme];
        if (!themeConfig) {
            return config.container.default.background;
        }
        return themeConfig.background;
    }
    static getFactTitleColor(theme) {
        let config = Host.getInstance().getConfig();
        let color = config.factSet.title.color;
        let isSubtle = config.factSet.title.isSubtle;
        return StyleConfig.getColor(color, theme, isSubtle);
    }
    static getFactValueColor(theme) {
        let config = Host.getInstance().getConfig();
        let color = config.factSet.value.color;
        let isSubtle = config.factSet.value.isSubtle;
        return StyleConfig.getColor(color, theme, isSubtle);
    }
    static getInputColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.color;
    }
    static getInputFocusColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusColor;
    }
    static getInputBackgroundColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.backgroundColor;
    }
    static getInputFocusBackgroundColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBackgroundColor;
    }
    static getInputBorderColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.borderColor;
    }
    static getInputFocusBorderColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBorderColor;
    }
    static getCheckboxTitleColor(theme) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.checkbox[theme];
        if (!themeConfig) {
            themeConfig = config.checkbox.default;
        }
        return themeConfig.title.color;
    }
    static getCheckboxBoxColor(theme, focused) {
        let config = Host.getInstance().getConfig();
        let themeConfig = config.checkbox[theme];
        if (!themeConfig) {
            themeConfig = config.checkbox.default;
        }
        if (focused) {
            return themeConfig.box.checked;
        }
        else {
            return themeConfig.box.unchecked;
        }
    }
    static get inSetImageSize() {
        return Host.getInstance().getConfig().imageSet.imageSize;
    }
    static get inSetImageMaxHeight() {
        return Host.getInstance().getConfig().imageSet.maxImageHeight;
    }
    static get factSetSpacing() {
        return Host.getInstance().getConfig().factSet.margin;
    }
    static get factTitleFontSize() {
        return StyleConfig.getFontSize(Host.getInstance().getConfig().factSet.title.size);
    }
    static get factTitleFontWeight() {
        return StyleConfig.getFontWeight(Host.getInstance().getConfig().factSet.title.weight);
    }
    static get factTitleWrap() {
        return StyleConfig.getWrap(Host.getInstance().getConfig().factSet.title.wrap);
    }
    static get factValueFontSize() {
        return StyleConfig.getFontSize(Host.getInstance().getConfig().factSet.value.size);
    }
    static get factValueFontWeight() {
        return StyleConfig.getFontWeight(Host.getInstance().getConfig().factSet.value.weight);
    }
    static get factValueWrap() {
        return StyleConfig.getWrap(Host.getInstance().getConfig().factSet.value.wrap);
    }
    static get fontFamily() {
        return Host.getInstance().getConfig().fontFamily;
    }
    static get separatorThickness() {
        return Host.getInstance().getConfig().separator.thickness * StyleSheet.hairlineWidth;
    }
    static get separatorColor() {
        return Host.getInstance().getConfig().separator.color;
    }
    static get separatorSpacing() {
        return Host.getInstance().getConfig().separator.spacing;
    }
    static get maxActions() {
        return Host.getInstance().getConfig().action.capacity;
    }
    static get actionSetSpacing() {
        return StyleConfig.getSpacing(Host.getInstance().getConfig().action.actionSetSpacing);
    }
    static get actionSpacing() {
        return Host.getInstance().getConfig().action.actionSpacing;
    }
    static get actionDirection() {
        return Host.getInstance().getConfig().action.direction;
    }
    static get actionAlignment() {
        return Host.getInstance().getConfig().action.align;
    }
    static get subCardSpacing() {
        return Host.getInstance().getConfig().action.showCard.margin;
    }
    static get subCardTheme() {
        return Host.getInstance().getConfig().action.showCard.style;
    }
}
