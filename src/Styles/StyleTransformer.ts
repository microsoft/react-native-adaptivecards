import { ColorSetConfig, HostConfig } from '../HostConfig/Types';

export class StyleTransformer {
    public static transformDirection(direction: 'horizontal' | 'vertically') {
        switch (direction) {
            case 'horizontal':
                return 'row';
            case 'vertically':
                return 'column';
            default:
                return 'column';
        }
    }

    public static transformAlign(align: 'left' | 'right' | 'center' | 'stretch') {
        switch (align) {
            case 'left':
                return 'flex-start';
            case 'right':
                return 'flex-end';
            case 'center':
                return 'center';
            case 'stretch':
                return 'stretch';
            default:
                return 'center';
        }
    }

    public static transformSpacing(
        spacing: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding',
        hostConfig: HostConfig) {
        if (hostConfig) {
            switch (spacing) {
                case 'none':
                    return 0;
                case 'default':
                    return hostConfig.spacing.default;
                case 'small':
                    return hostConfig.spacing.small;
                case 'medium':
                    return hostConfig.spacing.medium;
                case 'large':
                    return hostConfig.spacing.large;
                case 'extraLarge':
                    return hostConfig.spacing.extraLarge;
                case 'padding':
                    return hostConfig.spacing.padding;
                default:
                    return hostConfig.spacing.default;
            }
        }
        switch (spacing) {
            case 'none':
                return 0;
            case 'default':
                return 3;
            case 'small':
                return 8;
            case 'medium':
                return 20;
            case 'large':
                return 30;
            case 'extraLarge':
                return 40;
            case 'padding':
                return 10;
            default:
                return 3;
        }
    }

    public static transformImageSize(size: 'small' | 'medium' | 'large' | 'auto' | 'stretch', hostConfig: HostConfig) {
        if (hostConfig) {
            switch (size) {
                case 'small':
                    return hostConfig.imageSize.small;
                case 'medium':
                    return hostConfig.imageSize.medium;
                case 'large':
                    return hostConfig.imageSize.large;
                case 'auto':
                    return 'auto';
                case 'stretch':
                    return 'stretch';
                default:
                    return 'auto';
            }
        }
        switch (size) {
            case 'small':
                return 40;
            case 'medium':
                return 80;
            case 'large':
                return 160;
            case 'auto':
                return 'auto';
            case 'stretch':
                return 'stretch';
            default:
                return 'auto';
        }
    }

    public static transformFontSize(size: 'default' | 'small' | 'medium' | 'large' | 'extraLarge', hostConfig: HostConfig) {
        if (hostConfig) {
            switch (size) {
                case 'default':
                    return hostConfig.fontSize.default;
                case 'small':
                    return hostConfig.fontSize.small;
                case 'medium':
                    return hostConfig.fontSize.medium;
                case 'large':
                    return hostConfig.fontSize.large;
                case 'extraLarge':
                    return hostConfig.fontSize.extraLarge;
                default:
                    return hostConfig.fontSize.default;
            }
        }
        switch (size) {
            case 'default':
                return 14;
            case 'small':
                return 12;
            case 'medium':
                return 17;
            case 'large':
                return 21;
            case 'extraLarge':
                return 26;
            default:
                return 3;
        }
    }

    public static transformFontWeight(weight: 'default' | 'lighter' | 'bolder', hostConfig: HostConfig) {
        if (hostConfig) {
            switch (weight) {
                case 'default':
                    return hostConfig.fontWeight.default;
                case 'lighter':
                    return hostConfig.fontWeight.lighter;
                case 'bolder':
                    return hostConfig.fontWeight.bolder;
                default:
                    return hostConfig.fontWeight.default;
            }
        }
        switch (weight) {
            case 'default':
                return '400';
            case 'lighter':
                return '200';
            case 'bolder':
                return '600';
            default:
                return '400';
        }
    }

    public static transformTextAlign(align: 'left' | 'center' | 'right' | 'stretch') {
        switch (align) {
            case 'center':
                return 'center';
            case 'left':
                return 'left';
            case 'right':
                return 'right';
            default:
                return 'left';
        }
    }

    public static transformColor(
        color: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention',
        subtle: boolean, theme: 'default' | 'emphasis', hostConfig: HostConfig) {
        if (hostConfig) {
            let colorConfig: ColorSetConfig;
            if (theme === 'emphasis') {
                colorConfig = hostConfig.container.emphasis.foreground;
            } else {
                colorConfig = hostConfig.container.default.foreground;
            }
            switch (color) {
                case 'default':
                    if (subtle) {
                        return colorConfig.default.subtle;
                    }
                    return colorConfig.default.default;
                case 'dark':
                    if (subtle) {
                        return colorConfig.dark.subtle;
                    }
                    return colorConfig.dark.default;
                case 'light':
                    if (subtle) {
                        return colorConfig.light.subtle;
                    }
                    return colorConfig.light.default;
                case 'accent':
                    if (subtle) {
                        return colorConfig.accent.subtle;
                    }
                    return colorConfig.accent.default;
                case 'good':
                    if (subtle) {
                        return colorConfig.good.subtle;
                    }
                    return colorConfig.good.default;
                case 'warning':
                    if (subtle) {
                        return colorConfig.warning.subtle;
                    }
                    return colorConfig.warning.default;
                case 'attention':
                    if (subtle) {
                        return colorConfig.attention.subtle;
                    }
                    return colorConfig.attention.default;
                default:
                    if (subtle) {
                        return colorConfig.default.subtle;
                    }
                    return colorConfig.default.default;
            }
        } else {
            if (theme === 'emphasis') {
                switch (color) {
                    case 'default':
                        if (subtle) {
                            return '#333333EE';
                        }
                        return '#333333';
                    case 'dark':
                        if (subtle) {
                            return '#00000066';
                        }
                        return '#000000';
                    case 'light':
                        if (subtle) {
                            return '#FFFFFF33';
                        }
                        return '#FFFFFF';
                    case 'accent':
                        if (subtle) {
                            return '#2E89FC88';
                        }
                        return '#2E89FC';
                    case 'good':
                        if (subtle) {
                            return '#54A254DD';
                        }
                        return '#54A254';
                    case 'warning':
                        if (subtle) {
                            return '#C3AB23DD';
                        }
                        return '#C3AB23';
                    case 'attention':
                        if (subtle) {
                            return '#FF0000DD';
                        }
                        return '#FF0000';
                    default:
                        if (subtle) {
                            return '#333333EE';
                        }
                        return '#333333';
                }
            } else {
                switch (color) {
                    case 'default':
                        if (subtle) {
                            return '#333333EE';
                        }
                        return '#333333';
                    case 'dark':
                        if (subtle) {
                            return '#00000066';
                        }
                        return '#000000';
                    case 'light':
                        if (subtle) {
                            return '#FFFFFF33';
                        }
                        return '#FFFFFF';
                    case 'accent':
                        if (subtle) {
                            return '#2E89FC88';
                        }
                        return '#2E89FC';
                    case 'good':
                        if (subtle) {
                            return '#54A254DD';
                        }
                        return '#54A254';
                    case 'warning':
                        if (subtle) {
                            return '#C3AB23DD';
                        }
                        return '#C3AB23';
                    case 'attention':
                        if (subtle) {
                            return '#FF0000DD';
                        }
                        return '#FF0000';
                    default:
                        if (subtle) {
                            return '#333333EE';
                        }
                        return '#333333';
                }
            }
        }
    }

    public static transformBackgroundColor(theme: 'default' | 'emphasis', hostConfig: HostConfig) {
        if (hostConfig) {
            if (theme === 'emphasis') {
                return hostConfig.container.emphasis.background;
            } else {
                return hostConfig.container.default.background;
            }
        } else {
            if (theme === 'emphasis') {
                return '#00000008';
            } else {
                return '#FFFFFF';
            }
        }
    }

    public static transformColumnWidth(width: number | 'auto' | 'stretch') {
        if (width) {
            if (typeof width === 'number') {
                return width;
            }
            switch (width) {
                case 'auto':
                    return 'auto';
                case 'stretch':
                    return 'stretch';
                default:
                    return 'auto';
            }
        }
        return 'auto';
    }
}
