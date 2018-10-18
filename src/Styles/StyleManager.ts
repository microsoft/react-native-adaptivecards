import { StyleSheet } from 'react-native';

import { ConfigManager } from '../Configs/ConfigManager';
import { HostConfig } from '../Configs/Types';

export class StyleManager {
    public static getSpacing(spacing: 'small' | 'default' | 'medium' | 'large' | 'extraLarge' | 'padding' | 'none', config: HostConfig) {
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

    public static getFontSize(size: 'small' | 'default' | 'medium' | 'large' | 'extraLarge', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let fontSize = config.fontSize[size];
        if (!fontSize) {
            return config.fontSize.default;
        }
        return fontSize;
    }

    public static getFontWeight(weight: 'lighter' | 'default' | 'bolder', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let fontWeight = config.fontWeight[weight];
        if (!fontWeight) {
            return config.fontWeight.default;
        }
        return fontWeight;
    }

    public static getTextAlign(align: 'left' | 'center' | 'right') {
        if (align === 'left' || align === 'center' || align === 'right') {
            return align;
        }
        return 'left';
    }

    public static getHorizontalAlign(align: 'left' | 'center' | 'right') {
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

    public static getWrap(wrap: boolean) {
        if (wrap) {
            return 'wrap';
        }
        return 'nowrap';
    }

    public static getImageSize(size: 'small' | 'medium' | 'large' | 'auto' | 'stretch' | number, config: HostConfig) {
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

    public static getColor(
        color: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention',
        theme: 'default' | 'emphasis',
        isSubtle: boolean,
        config: HostConfig) {
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
        } else {
            return colorConfig.default;
        }
    }

    public static getBackgroundColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.container[theme];
        if (!themeConfig) {
            return config.container.default.background;
        }
        return themeConfig.background;
    }

    public static getFactTitleColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let color = config.factSet.title.color;
        let isSubtle = config.factSet.title.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle, config);
    }

    public static getFactValueColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let color = config.factSet.value.color;
        let isSubtle = config.factSet.value.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle, config);
    }

    public static getInputColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.color;
    }

    public static getInputFocusColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusColor;
    }

    public static getInputBackgroundColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.backgroundColor;
    }

    public static getInputFocusBackgroundColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBackgroundColor;
    }

    public static getInputBorderColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.borderColor;
    }

    public static getInputFocusBorderColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBorderColor;
    }

    public static getCheckboxTitleColor(theme: 'default' | 'emphasis', config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.checkbox[theme];
        if (!themeConfig) {
            themeConfig = config.checkbox.default;
        }
        return themeConfig.title.color;
    }

    public static getCheckboxBoxColor(theme: 'default' | 'emphasis', focused: boolean, config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        let themeConfig = config.checkbox[theme];
        if (!themeConfig) {
            themeConfig = config.checkbox.default;
        }
        if (focused) {
            return themeConfig.box.checked;
        } else {
            return themeConfig.box.unchecked;
        }
    }

    public static getInSetImageSize(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.imageSet.imageSize;
    }

    public static getInSetImageMaxHeight(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.imageSet.maxImageHeight;
    }

    public static getFactSetSpacing(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.factSet.margin;
    }

    public static getFactTitleFontSize(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontSize(config.factSet.title.size, config);
    }

    public static getFactTitleFontWeight(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontWeight(config.factSet.title.weight, config);
    }

    public static getFactTitleWrap(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getWrap(config.factSet.title.wrap);
    }

    public static getFactValueFontSize(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontSize(config.factSet.value.size, config);
    }

    public static getFactValueFontWeight(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getFontWeight(config.factSet.value.weight, config);
    }

    public static getFactValueWrap(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getWrap(config.factSet.value.wrap);
    }

    public static getFontFamily(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.fontFamily;
    }

    public static getSeparatorThickness(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.separator.thickness * StyleSheet.hairlineWidth;
    }

    public static getSeparatorColor(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.separator.color;
    }

    public static getSeparatorSpacing(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.separator.spacing;
    }

    public static getMaxActions(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.capacity;
    }

    public static getActionSetSpacing(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return StyleManager.getSpacing(config.action.actionSetSpacing, config);
    }

    public static getActionSpacing(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.actionSpacing;
    }

    public static getActionDirection(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.direction;
    }

    public static getActionAlignment(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.align;
    }

    public static getSubCardSpacing(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.showCard.margin;
    }

    public static getSubCardTheme(config: HostConfig) {
        if (!config) {
            config = ConfigManager.getInstance().getConfig();
        }
        return config.action.showCard.style;
    }
}
