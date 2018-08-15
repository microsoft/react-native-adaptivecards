import { HostContext } from '../Contexts/HostContext';
export class StyleManager {
    static getSpacing(spacing) {
        if (spacing === 'none') {
            return 0;
        }
        let config = HostContext.getInstance().getConfig();
        let spacingConfig = config.spacing[spacing];
        if (!spacingConfig) {
            return config.spacing.default;
        }
        return spacingConfig;
    }
    static getFontSize(size) {
        let config = HostContext.getInstance().getConfig();
        let fontSize = config.fontSize[size];
        if (!fontSize) {
            return config.fontSize.default;
        }
        return fontSize;
    }
    static getFontWeight(weight) {
        let config = HostContext.getInstance().getConfig();
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
        let config = HostContext.getInstance().getConfig();
        if (size === undefined) {
            return 'auto';
        }
        if (size === 'small' || size === 'medium' || size === 'large') {
            return config.imageSize[size];
        }
        return size;
    }
    static getColor(color, theme, isSubtle) {
        let config = HostContext.getInstance().getConfig();
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
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.container[theme];
        if (!themeConfig) {
            return config.container.default.background;
        }
        return themeConfig.background;
    }
    static getFactTitleColor(theme) {
        let config = HostContext.getInstance().getConfig();
        let color = config.factSet.title.color;
        let isSubtle = config.factSet.title.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle);
    }
    static getFactValueColor(theme) {
        let config = HostContext.getInstance().getConfig();
        let color = config.factSet.value.color;
        let isSubtle = config.factSet.value.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle);
    }
    static getInputColor(theme) {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.color;
    }
    static getInputBackgroundColor(theme) {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.backgroundColor;
    }
    static getInputBorderColor(theme) {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.borderColor;
    }
    static getInputFocusBorderColor(theme) {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBorderColor;
    }
    static get inSetImageSize() {
        return HostContext.getInstance().getConfig().imageSet.imageSize;
    }
    static get inSetImageMaxHeight() {
        return HostContext.getInstance().getConfig().imageSet.maxImageHeight;
    }
    static get factSetSpacing() {
        return HostContext.getInstance().getConfig().factSet.margin;
    }
    static get factTitleFontSize() {
        return StyleManager.getFontSize(HostContext.getInstance().getConfig().factSet.title.size);
    }
    static get factTitleFontWeight() {
        return StyleManager.getFontWeight(HostContext.getInstance().getConfig().factSet.title.weight);
    }
    static get factTitleWrap() {
        return StyleManager.getWrap(HostContext.getInstance().getConfig().factSet.title.wrap);
    }
    static get factValueFontSize() {
        return StyleManager.getFontSize(HostContext.getInstance().getConfig().factSet.value.size);
    }
    static get factValueFontWeight() {
        return StyleManager.getFontWeight(HostContext.getInstance().getConfig().factSet.value.weight);
    }
    static get factValueWrap() {
        return StyleManager.getWrap(HostContext.getInstance().getConfig().factSet.value.wrap);
    }
    static get fontFamily() {
        return HostContext.getInstance().getConfig().fontFamily;
    }
    static get separatorThickness() {
        return HostContext.getInstance().getConfig().separator.thickness;
    }
    static get separatorColor() {
        return HostContext.getInstance().getConfig().separator.color;
    }
    static get separatorSpacing() {
        return HostContext.getInstance().getConfig().separator.spacing;
    }
    static get maxActions() {
        return HostContext.getInstance().getConfig().action.capacity;
    }
    static get actionSetSpacing() {
        return StyleManager.getSpacing(HostContext.getInstance().getConfig().action.actionSetSpacing);
    }
    static get actionSpacing() {
        return HostContext.getInstance().getConfig().action.actionSpacing;
    }
    static get actionDirection() {
        return HostContext.getInstance().getConfig().action.direction;
    }
    static get actionAlignment() {
        return HostContext.getInstance().getConfig().action.align;
    }
    static get subCardSpacing() {
        return HostContext.getInstance().getConfig().action.showCard.margin;
    }
    static get subCardTheme() {
        return HostContext.getInstance().getConfig().action.showCard.style;
    }
}
