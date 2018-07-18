export class SpacingConfig {
    constructor(json) {
        if (json) {
            this.default = json['default'];
            this.small = json['small'];
            this.medium = json['medium'];
            this.large = json['large'];
            this.extraLarge = json['extraLarge'];
            this.padding = json['padding'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        default: current.default !== undefined ? current.default : prev.default,
                        small: current.small !== undefined ? current.small : prev.small,
                        medium: current.medium !== undefined ? current.medium : prev.medium,
                        large: current.large !== undefined ? current.large : prev.large,
                        extraLarge: current.extraLarge !== undefined ? current.extraLarge : prev.extraLarge,
                        padding: current.padding !== undefined ? current.padding : prev.padding,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class SeparatorConfig {
    constructor(json) {
        if (json) {
            this.thickness = json['lineThickness'];
            this.color = json['lineColor'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        thickness: current.thickness !== undefined ? current.thickness : prev.thickness,
                        color: current.color !== undefined ? current.color : prev.color,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class FontSizeConfig {
    constructor(json) {
        if (json) {
            this.default = json['default'];
            this.small = json['small'];
            this.medium = json['medium'];
            this.large = json['large'];
            this.extraLarge = json['extraLarge'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        default: current.default !== undefined ? current.default : prev.default,
                        small: current.small !== undefined ? current.small : prev.small,
                        medium: current.medium !== undefined ? current.medium : prev.medium,
                        large: current.large !== undefined ? current.large : prev.large,
                        extraLarge: current.extraLarge !== undefined ? current.extraLarge : prev.extraLarge,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class FontWeightConfig {
    constructor(json) {
        if (json) {
            this.default = json['default'] + '';
            this.lighter = json['lighter'] + '';
            this.bolder = json['bolder'] + '';
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        default: current.default !== undefined ? current.default : prev.default,
                        lighter: current.lighter !== undefined ? current.lighter : prev.lighter,
                        bolder: current.bolder !== undefined ? current.bolder : prev.bolder,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ColorConfig {
    constructor(json) {
        if (json) {
            this.default = json['default'] || this.default;
            this.subtle = json['subtle'] || this.subtle;
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        default: current.default !== undefined ? current.default : prev.default,
                        subtle: current.subtle !== undefined ? current.subtle : prev.subtle,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ColorSetConfig {
    constructor(json) {
        if (json) {
            this.default = new ColorConfig(json['default']);
            this.dark = new ColorConfig(json['dark']);
            this.light = new ColorConfig(json['light']);
            this.accent = new ColorConfig(json['accent']);
            this.attention = new ColorConfig(json['attention']);
            this.good = new ColorConfig(json['good']);
            this.warning = new ColorConfig(json['warning']);
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        default: prev.default !== undefined ? prev.default.combine(current.default) : current.default,
                        dark: prev.default !== undefined ? prev.dark.combine(current.dark) : current.dark,
                        light: prev.light !== undefined ? prev.light.combine(current.light) : current.light,
                        accent: prev.accent !== undefined ? prev.accent.combine(current.accent) : current.accent,
                        attention: prev.attention !== undefined ? prev.attention.combine(current.attention) : current.attention,
                        good: prev.good !== undefined ? prev.good.combine(current.good) : current.good,
                        warning: prev.warning !== undefined ? prev.warning.combine(current.warning) : current.warning,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ThemeConfig {
    constructor(json) {
        if (json) {
            this.background = json['backgroundColor'];
            this.foreground = new ColorSetConfig(json['foregroundColors']);
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        background: current.background !== undefined ? current.background : prev.background,
                        foreground: prev.foreground !== undefined ? prev.foreground.combine(current.foreground) : current.foreground,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ContainerConfig {
    constructor(json) {
        if (json) {
            this.default = new ThemeConfig(json['default']);
            this.emphasis = new ThemeConfig(json['emphasis']);
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        default: prev.default !== undefined ? prev.default.combine(current.default) : current.default,
                        emphasis: prev.emphasis !== undefined ? prev.emphasis.combine(current.emphasis) : current.emphasis,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ImageSizeConfig {
    constructor(json) {
        if (json) {
            this.small = json['small'];
            this.medium = json['medium'];
            this.large = json['large'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        small: current.small !== undefined ? current.small : prev.small,
                        medium: current.medium !== undefined ? current.medium : prev.medium,
                        large: current.large !== undefined ? current.large : prev.large,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ShowCardActionConfig {
    constructor(json) {
        if (json) {
            this.mode = json['actionMode'];
            this.margin = json['inlineTopMargin'];
            this.style = json['style'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        mode: current.mode !== undefined ? current.mode : prev.mode,
                        margin: current.margin !== undefined ? current.margin : prev.margin,
                        style: current.style !== undefined ? current.style : prev.style,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ActionConfig {
    constructor(json) {
        if (json) {
            this.capacity = json['maxActions'];
            this.spacing = json['spacing'];
            this.actionSpacing = json['buttonSpacing'];
            this.showCard = new ShowCardActionConfig(json['showCard']);
            this.cardExpanding = json['preExpandSingleShowCardAction'];
            this.direction = json['actionsOrientation'];
            this.align = json['actionAlignment'];
            this.iconPosition = json['iconPlacement'];
            this.iconSize = json['iconSize'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        capacity: current.capacity !== undefined ? current.capacity : prev.capacity,
                        spacing: current.spacing !== undefined ? current.spacing : prev.spacing,
                        actionSpacing: current.actionSpacing !== undefined ? current.actionSpacing : prev.actionSpacing,
                        showCard: prev.showCard !== undefined ? prev.showCard.combine(current.showCard) : current.showCard,
                        cardExpanding: current.cardExpanding !== undefined ? current.cardExpanding : prev.cardExpanding,
                        direction: current.direction !== undefined ? current.direction : prev.direction,
                        align: current.align !== undefined ? current.align : prev.align,
                        iconPosition: current.iconPosition !== undefined ? current.iconPosition : prev.iconPosition,
                        iconSize: current.iconSize !== undefined ? current.iconSize : prev.iconSize,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class CardConfig {
    constructor(json) {
        if (json) {
            this.allowCustomStyle = json['allowCustomStyle'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        allowCustomStyle: current.allowCustomStyle !== undefined ? current.allowCustomStyle : prev.allowCustomStyle,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class ImageSetConfig {
    constructor(json) {
        if (json) {
            this.imageSize = json['imageSize'];
            this.maxImageHeight = json['maxImageHeight'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        imageSize: current.imageSize !== undefined ? current.imageSize : prev.imageSize,
                        maxImageHeight: current.maxImageHeight !== undefined ? current.maxImageHeight : prev.maxImageHeight,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class FactValueConfig {
    constructor(json) {
        if (json) {
            this.size = json['size'];
            this.color = json['color'];
            this.isSubtle = json['isSubtle'];
            this.weight = json['weight'];
            this.wrap = json['wrap'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        size: current.size !== undefined ? current.size : prev.size,
                        color: current.color !== undefined ? current.color : prev.color,
                        isSubtle: current.isSubtle !== undefined ? current.isSubtle : prev.isSubtle,
                        weight: current.weight !== undefined ? current.weight : prev.weight,
                        wrap: current.wrap !== undefined ? current.wrap : prev.wrap,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class FactTitleConfig {
    constructor(json) {
        if (json) {
            this.size = json['size'];
            this.color = json['color'];
            this.isSubtle = json['isSubtle'];
            this.weight = json['weight'];
            this.wrap = json['wrap'];
            this.maxWidth = json['maxWidth'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        size: current.size !== undefined ? current.size : prev.size,
                        color: current.color !== undefined ? current.color : prev.color,
                        isSubtle: current.isSubtle !== undefined ? current.isSubtle : prev.isSubtle,
                        weight: current.weight !== undefined ? current.weight : prev.weight,
                        wrap: current.wrap !== undefined ? current.wrap : prev.wrap,
                        maxWidth: current.maxWidth !== undefined ? current.maxWidth : prev.maxWidth,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class FactSetConfig {
    constructor(json) {
        if (json) {
            this.title = new FactTitleConfig(json['title']);
            this.value = new FactValueConfig(json['value']);
            this.margin = json['spacing'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        title: prev.title !== undefined ? prev.title.combine(current.title) : current.title,
                        value: prev.value !== undefined ? prev.value.combine(current.value) : current.value,
                        margin: current.margin !== undefined ? current.margin : prev.margin,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class MediaConfig {
    constructor(json) {
        if (json) {
            this.defaultPosterUrl = json['defaultPoster'];
            this.playButtonUrl = json['playButton'];
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        defaultPosterUrl: current.defaultPosterUrl !== undefined ? current.defaultPosterUrl : prev.defaultPosterUrl,
                        playButtonUrl: current.playButtonUrl !== undefined ? current.playButtonUrl : prev.playButtonUrl,
                    };
                }
                return prev;
            }, this);
        }
    }
}
export class HostConfig {
    constructor(json) {
        if (json) {
            this.spacing = new SpacingConfig(json['spacing']);
            this.separator = new SeparatorConfig(json['separator']);
            this.supportInteractive = json['supportsInteractivity'];
            this.fontFamily = json['fontFamily'];
            this.fontSize = new FontSizeConfig(json['fontSizes']);
            this.fontWeight = new FontWeightConfig(json['fontWeights']);
            this.container = new ContainerConfig(json['containerStyles']);
            this.imageSize = new ImageSizeConfig(json['imageSizes']);
            this.action = new ActionConfig(json['actions']);
            this.card = new CardConfig(json['adaptiveCard']);
            this.imageSet = new ImageSetConfig(json['imageSet']);
            this.factSet = new FactSetConfig(json['factSet']);
            this.media = new MediaConfig(json['media']);
        }
    }
    combine(...args) {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    return {
                        spacing: prev.spacing !== undefined ? prev.spacing.combine(current.spacing) : current.spacing,
                        separator: prev.separator !== undefined ? prev.separator.combine(current.separator) : current.separator,
                        supportInteractive: current.supportInteractive !== undefined ? current.supportInteractive : prev.supportInteractive,
                        fontFamily: current.fontFamily !== undefined ? current.fontFamily : prev.fontFamily,
                        fontSize: prev.fontSize !== undefined ? prev.fontSize.combine(current.fontSize) : current.fontSize,
                        fontWeight: prev.fontWeight !== undefined ? prev.fontWeight.combine(current.fontWeight) : current.fontWeight,
                        container: prev.container !== undefined ?
                            prev.container.combine(current.container) :
                            current.container,
                        imageSize: prev.imageSize !== undefined ? prev.imageSize.combine(current.imageSize) : current.imageSize,
                        action: prev.action !== undefined ? prev.action.combine(current.action) : current.action,
                        card: prev.card !== undefined ? prev.card.combine(current.card) : current.card,
                        imageSet: prev.imageSet !== undefined ? prev.imageSet.combine(current.imageSet) : current.imageSet,
                        factSet: prev.factSet !== undefined ? prev.factSet.combine(current.factSet) : current.factSet,
                        media: prev.media !== undefined ? prev.media.combine(current.media) : current.media,
                    };
                }
                return prev;
            }, this);
        }
    }
}
