import { StyleSheet } from 'react-native';
import { ConfigManager } from '../Configs/ConfigManager';
export class StyleManager {
    static getSpacing(spacing, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        if (spacing === 'none') {
            return 0;
        }
        let spacingConfig = config.spacing[spacing];
        if (!spacingConfig) {
            return config.spacing.default;
        }
        return spacingConfig;
    }
    static getFontSize(size, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let fontSize = config.fontSize[size];
        if (!fontSize) {
            return config.fontSize.default;
        }
        return fontSize;
    }
    static getFontWeight(weight, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
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
    static getImageSize(size, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        if (size === undefined) {
            return 'auto';
        }
        if (size === 'small' || size === 'medium' || size === 'large') {
            return config.imageSize[size];
        }
        return size;
    }
    static getColor(color, theme, isSubtle, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
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
    static getBackgroundColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.container[theme];
        if (!themeConfig) {
            return config.container.default.background;
        }
        return themeConfig.background;
    }
    static getFactTitleColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let color = config.factSet.title.color;
        let isSubtle = config.factSet.title.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle, config);
    }
    static getFactValueColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let color = config.factSet.value.color;
        let isSubtle = config.factSet.value.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle, config);
    }
    static getInputColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.color;
    }
    static getInputFocusColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusColor;
    }
    static getInputBackgroundColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.backgroundColor;
    }
    static getInputFocusBackgroundColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBackgroundColor;
    }
    static getInputBorderColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.borderColor;
    }
    static getInputFocusBorderColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBorderColor;
    }
    static getCheckboxTitleColor(theme, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.checkbox[theme];
        if (!themeConfig) {
            themeConfig = config.checkbox.default;
        }
        return themeConfig.title.color;
    }
    static getCheckboxBoxColor(theme, focused, config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
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
    static getInSetImageSize(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.imageSet.imageSize;
    }
    static getInSetImageMaxHeight(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.imageSet.maxImageHeight;
    }
    static getFactSetSpacing(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.factSet.margin;
    }
    static getFactTitleFontSize(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontSize(config.factSet.title.size, config);
    }
    static getFactTitleFontWeight(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontWeight(config.factSet.title.weight, config);
    }
    static getFactTitleWrap(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getWrap(config.factSet.title.wrap);
    }
    static getFactValueFontSize(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontSize(config.factSet.value.size, config);
    }
    static getFactValueFontWeight(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontWeight(config.factSet.value.weight, config);
    }
    static getFactValueWrap(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getWrap(config.factSet.value.wrap);
    }
    static getFontFamily(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.fontFamily;
    }
    static getSeparatorThickness(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.separator.thickness * StyleSheet.hairlineWidth;
    }
    static getSeparatorColor(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.separator.color;
    }
    static getSeparatorSpacing(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.separator.spacing;
    }
    static getMaxActions(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.capacity;
    }
    static getActionSetSpacing(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getSpacing(config.action.actionSetSpacing, config);
    }
    static getActionSpacing(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.actionSpacing;
    }
    static getActionDirection(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.direction;
    }
    static getActionAlignment(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.align;
    }
    static getSubCardSpacing(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.showCard.margin;
    }
    static getSubCardTheme(config) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.showCard.style;
    }
}
