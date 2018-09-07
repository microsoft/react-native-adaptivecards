// TODO:: HostConfig needs to provide a default value.

export class SpacingConfig {
    public default: number;
    public small: number;
    public medium: number;
    public large: number;
    public extraLarge: number;
    public padding: number;

    constructor(json?: any) {
        if (json) {
            this.default = json['default'];
            this.small = json['small'];
            this.medium = json['medium'];
            this.large = json['large'];
            this.extraLarge = json['extraLarge'];
            this.padding = json['padding'];
        }
    }

    public combine(...args: SpacingConfig[]): SpacingConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new SpacingConfig();
                    combined.default = current.default !== undefined ? current.default : prev.default;
                    combined.small = current.small !== undefined ? current.small : prev.small;
                    combined.medium = current.medium !== undefined ? current.medium : prev.medium;
                    combined.large = current.large !== undefined ? current.large : prev.large;
                    combined.extraLarge = current.extraLarge !== undefined ? current.extraLarge : prev.extraLarge;
                    combined.padding = current.padding !== undefined ? current.padding : prev.padding;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class SeparatorConfig {
    public thickness: number;
    public color: string;
    public spacing: number;

    constructor(json?: any) {
        if (json) {
            this.thickness = json['lineThickness'];
            this.color = json['lineColor'];
            this.spacing = json['spacing'];
        }
    }

    public combine(...args: SeparatorConfig[]): SeparatorConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new SeparatorConfig();
                    combined.thickness = current.thickness !== undefined ? current.thickness : prev.thickness;
                    combined.color = current.color !== undefined ? current.color : prev.color;
                    combined.spacing = current.spacing !== undefined ? current.spacing : prev.spacing;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class FontSizeConfig {
    public default: number;
    public small: number;
    public medium: number;
    public large: number;
    public extraLarge: number;

    constructor(json?: any) {
        if (json) {
            this.default = json['default'];
            this.small = json['small'];
            this.medium = json['medium'];
            this.large = json['large'];
            this.extraLarge = json['extraLarge'];
        }
    }

    public combine(...args: FontSizeConfig[]): FontSizeConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new FontSizeConfig();
                    combined.default = current.default !== undefined ? current.default : prev.default;
                    combined.small = current.small !== undefined ? current.small : prev.small;
                    combined.medium = current.medium !== undefined ? current.medium : prev.medium;
                    combined.large = current.large !== undefined ? current.large : prev.large;
                    combined.extraLarge = current.extraLarge !== undefined ? current.extraLarge : prev.extraLarge;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class FontWeightConfig {
    public default: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    public lighter: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    public bolder: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

    constructor(json?: any) {
        if (json) {
            // Since RN only accept string format fontWeight and HostConfig standard fontWeight is number,
            // we need to transform the number to string.
            this.default = json['default'] + '' as any;
            this.lighter = json['lighter'] + '' as any;
            this.bolder = json['bolder'] + '' as any;
        }
    }

    public combine(...args: FontWeightConfig[]): FontWeightConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new FontWeightConfig();
                    combined.default = current.default !== undefined ? current.default : prev.default;
                    combined.lighter = current.lighter !== undefined ? current.lighter : prev.lighter;
                    combined.bolder = current.bolder !== undefined ? current.bolder : prev.bolder;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ColorConfig {
    public default: string;
    public subtle: string;

    constructor(json?: any) {
        if (json) {
            this.default = json['default'] || this.default;
            this.subtle = json['subtle'] || this.subtle;
        }
    }

    public combine(...args: ColorConfig[]): ColorConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ColorConfig();
                    combined.default = current.default !== undefined ? current.default : prev.default;
                    combined.subtle = current.subtle !== undefined ? current.subtle : prev.subtle;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ColorSetConfig {
    public default: ColorConfig;
    public dark: ColorConfig;
    public light: ColorConfig;
    public accent: ColorConfig;
    public attention: ColorConfig;
    public good: ColorConfig;
    public warning: ColorConfig;

    constructor(json?: any) {
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

    public combine(...args: ColorSetConfig[]): ColorSetConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ColorSetConfig();
                    combined.default = prev.default !== undefined ? prev.default.combine(current.default) : current.default;
                    combined.dark = prev.dark !== undefined ? prev.dark.combine(current.dark) : current.dark;
                    combined.light = prev.light !== undefined ? prev.light.combine(current.light) : current.light;
                    combined.accent = prev.accent !== undefined ? prev.accent.combine(current.accent) : current.accent;
                    combined.attention = prev.attention !== undefined ? prev.attention.combine(current.attention) : current.attention;
                    combined.good = prev.good !== undefined ? prev.good.combine(current.good) : current.good;
                    combined.warning = prev.warning !== undefined ? prev.warning.combine(current.warning) : current.warning;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ThemeConfig {
    public background: string;
    public foreground: ColorSetConfig;

    constructor(json?: any) {
        if (json) {
            this.background = json['backgroundColor'];
            this.foreground = new ColorSetConfig(json['foregroundColors']);
        }
    }

    public combine(...args: ThemeConfig[]): ThemeConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ThemeConfig();
                    combined.background = current.background !== undefined ? current.background : prev.background;
                    combined.foreground = prev.foreground !== undefined ? prev.foreground.combine(current.foreground) : current.foreground;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ContainerConfig {
    public default: ThemeConfig;
    public emphasis: ThemeConfig;

    constructor(json?: any) {
        if (json) {
            this.default = new ThemeConfig(json['default']);
            this.emphasis = new ThemeConfig(json['emphasis']);
        }
    }

    public combine(...args: ContainerConfig[]): ContainerConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ContainerConfig();
                    combined.default = prev.default !== undefined ? prev.default.combine(current.default) : current.default;
                    combined.emphasis = prev.emphasis !== undefined ? prev.emphasis.combine(current.emphasis) : current.emphasis;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ImageSizeConfig {
    public small: number;
    public medium: number;
    public large: number;

    constructor(json?: any) {
        if (json) {
            this.small = json['small'];
            this.medium = json['medium'];
            this.large = json['large'];
        }
    }

    public combine(...args: ImageSizeConfig[]): ImageSizeConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ImageSizeConfig();
                    combined.small = current.small !== undefined ? current.small : prev.small;
                    combined.medium = current.medium !== undefined ? current.medium : prev.medium;
                    combined.large = current.large !== undefined ? current.large : prev.large;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ShowCardActionConfig {
    public mode: 'Inline' | 'Popup' | 'InlineEdgeToEdge';
    public margin: number;
    public style: 'default' | 'emphasis';

    constructor(json?: any) {
        if (json) {
            this.mode = json['actionMode'];
            this.margin = json['inlineTopMargin'];
            this.style = json['style'];
        }
    }

    public combine(...args: ShowCardActionConfig[]): ShowCardActionConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ShowCardActionConfig();
                    combined.mode = current.mode !== undefined ? current.mode : prev.mode;
                    combined.margin = current.margin !== undefined ? current.margin : prev.margin;
                    combined.style = current.style !== undefined ? current.style : prev.style;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ActionConfig {
    public capacity: number;
    public actionSetSpacing: 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
    public actionSpacing: number;
    public showCard: ShowCardActionConfig;
    public cardExpanding: boolean;
    public direction: 'horizontal' | 'vertically';
    public align: 'left' | 'right' | 'center' | 'stretch';
    public iconPosition: 'LeftOfTitle' | 'AboveTitle';
    public iconSize: number;

    constructor(json?: any) {
        if (json) {
            this.capacity = json['maxActions'];
            this.actionSetSpacing = json['spacing'];
            this.actionSpacing = json['buttonSpacing'];
            this.showCard = new ShowCardActionConfig(json['showCard']);
            this.cardExpanding = json['preExpandSingleShowCardAction'];
            this.direction = json['actionsOrientation'];
            this.align = json['actionAlignment'];
            this.iconPosition = json['iconPlacement'];
            this.iconSize = json['iconSize'];
        }
    }

    public combine(...args: ActionConfig[]): ActionConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ActionConfig();
                    combined.capacity = current.capacity !== undefined ? current.capacity : prev.capacity;
                    combined.actionSetSpacing = current.actionSetSpacing !== undefined ? current.actionSetSpacing : prev.actionSetSpacing;
                    combined.actionSpacing = current.actionSpacing !== undefined ? current.actionSpacing : prev.actionSpacing;
                    combined.showCard = prev.showCard !== undefined ? prev.showCard.combine(current.showCard) : current.showCard;
                    combined.cardExpanding = current.cardExpanding !== undefined ? current.cardExpanding : prev.cardExpanding;
                    combined.direction = current.direction !== undefined ? current.direction : prev.direction;
                    combined.align = current.align !== undefined ? current.align : prev.align;
                    combined.iconPosition = current.iconPosition !== undefined ? current.iconPosition : prev.iconPosition;
                    combined.iconSize = current.iconSize !== undefined ? current.iconSize : prev.iconSize;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class CardConfig {
    public allowCustomStyle: boolean;

    constructor(json?: any) {
        if (json) {
            this.allowCustomStyle = json['allowCustomStyle'];
        }
    }

    public combine(...args: CardConfig[]): CardConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new CardConfig();
                    combined.allowCustomStyle = current.allowCustomStyle !== undefined ? current.allowCustomStyle : prev.allowCustomStyle;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class ImageSetConfig {
    public imageSize: 'small' | 'medium' | 'large' | 'auto' | 'stretch';
    public maxImageHeight: number;

    constructor(json?: any) {
        if (json) {
            this.imageSize = json['imageSize'];
            this.maxImageHeight = json['maxImageHeight'];
        }
    }

    public combine(...args: ImageSetConfig[]): ImageSetConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new ImageSetConfig();
                    combined.imageSize = current.imageSize !== undefined ? current.imageSize : prev.imageSize;
                    combined.maxImageHeight = current.maxImageHeight !== undefined ? current.maxImageHeight : prev.maxImageHeight;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class FactValueConfig {
    public size: 'default' | 'small' | 'medium' | 'large' | 'extraLarge';
    public color: 'default' | 'accent' | 'attention' | 'good' | 'warning';
    public isSubtle: boolean;
    public weight: 'default' | 'lighter' | 'bolder';
    public wrap: boolean;

    constructor(json?: any) {
        if (json) {
            this.size = json['size'];
            this.color = json['color'];
            this.isSubtle = json['isSubtle'];
            this.weight = json['weight'];
            this.wrap = json['wrap'];
        }
        return this;
    }

    public combine(...args: FactValueConfig[]): FactValueConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new FactValueConfig();
                    combined.size = current.size !== undefined ? current.size : prev.size;
                    combined.color = current.color !== undefined ? current.color : prev.color;
                    combined.isSubtle = current.isSubtle !== undefined ? current.isSubtle : prev.isSubtle;
                    combined.weight = current.weight !== undefined ? current.weight : prev.weight;
                    combined.wrap = current.wrap !== undefined ? current.wrap : prev.wrap;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class FactTitleConfig {
    public size: 'default' | 'small' | 'medium' | 'large' | 'extraLarge';
    public color: 'default' | 'accent' | 'attention' | 'good' | 'warning';
    public isSubtle: boolean;
    public weight: 'default' | 'lighter' | 'bolder';
    public wrap: boolean;
    public maxWidth: number;

    constructor(json?: any) {
        if (json) {
            this.size = json['size'];
            this.color = json['color'];
            this.isSubtle = json['isSubtle'];
            this.weight = json['weight'];
            this.wrap = json['wrap'];
            this.maxWidth = json['maxWidth'];
        }
    }

    public combine(...args: FactTitleConfig[]): FactTitleConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new FactTitleConfig();
                    combined.size = current.size !== undefined ? current.size : prev.size;
                    combined.color = current.color !== undefined ? current.color : prev.color;
                    combined.isSubtle = current.isSubtle !== undefined ? current.isSubtle : prev.isSubtle;
                    combined.weight = current.weight !== undefined ? current.weight : prev.weight;
                    combined.wrap = current.wrap !== undefined ? current.wrap : prev.wrap;
                    combined.maxWidth = current.maxWidth !== undefined ? current.maxWidth : prev.maxWidth;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class FactSetConfig {
    public title: FactTitleConfig;
    public value: FactValueConfig;
    public margin: number;

    constructor(json?: any) {
        if (json) {
            this.title = new FactTitleConfig(json['title']);
            this.value = new FactValueConfig(json['value']);
            this.margin = json['spacing'];
        }
    }

    public combine(...args: FactSetConfig[]): FactSetConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new FactSetConfig();
                    combined.title = prev.title !== undefined ? prev.title.combine(current.title) : current.title;
                    combined.value = prev.value !== undefined ? prev.value.combine(current.value) : current.value;
                    combined.margin = current.margin !== undefined ? current.margin : prev.margin;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class InputThemeConfig {
    public color: string;
    public focusColor: string;
    public backgroundColor: string;
    public focusBackgroundColor: string;
    public borderColor: string;
    public focusBorderColor: string;

    constructor(json?: any) {
        if (json) {
            this.color = json['color'];
            this.focusColor = json['focusColor'];
            this.backgroundColor = json['backgroundColor'];
            this.focusBackgroundColor = json['focusBackgroundColor'];
            this.borderColor = json['borderColor'];
            this.focusBorderColor = json['focusBorderColor'];
        }
    }

    public combine(...args: InputThemeConfig[]): InputThemeConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new InputThemeConfig();
                    combined.color = current.color !== undefined ? current.color : prev.color;
                    combined.focusColor = current.focusColor !== undefined ? current.focusColor : prev.focusColor;
                    combined.backgroundColor = current.backgroundColor !== undefined ? current.backgroundColor : prev.backgroundColor;
                    combined.focusBackgroundColor =
                        current.focusBackgroundColor !== undefined ? current.focusBackgroundColor : prev.focusBackgroundColor;
                    combined.borderColor = current.borderColor !== undefined ? current.borderColor : prev.borderColor;
                    combined.focusBorderColor = current.focusBorderColor !== undefined ? current.focusBorderColor : prev.focusBorderColor;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class InputConfig {
    public default: InputThemeConfig;
    public emphasis: InputThemeConfig;

    constructor(json?: any) {
        if (json) {
            this.default = new InputThemeConfig(json['default']);
            this.emphasis = new InputThemeConfig(json['emphasis']);
        }
    }

    public combine(...args: InputConfig[]): InputConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new InputConfig();
                    combined.default = prev.default !== undefined ? prev.default.combine(current.default) : current.default;
                    combined.emphasis = prev.emphasis !== undefined ? prev.emphasis.combine(current.emphasis) : current.emphasis;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class MediaConfig {
    public defaultPosterUrl: string;
    public playButtonUrl: string;

    constructor(json?: any) {
        if (json) {
            this.defaultPosterUrl = json['defaultPoster'];
            this.playButtonUrl = json['playButton'];
        }
    }

    public combine(...args: MediaConfig[]): MediaConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new MediaConfig();
                    combined.defaultPosterUrl = current.defaultPosterUrl !== undefined ? current.defaultPosterUrl : prev.defaultPosterUrl;
                    combined.playButtonUrl = current.playButtonUrl !== undefined ? current.playButtonUrl : prev.playButtonUrl;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}

export class HostConfig {
    public spacing: SpacingConfig;
    public separator: SeparatorConfig;
    public supportInteractive: boolean;
    public fontFamily: string;
    public fontSize: FontSizeConfig;
    public fontWeight: FontWeightConfig;
    public container: ContainerConfig;
    public imageSize: ImageSizeConfig;
    public action: ActionConfig;
    public card: CardConfig;
    public imageSet: ImageSetConfig;
    public factSet: FactSetConfig;
    public media: MediaConfig;
    public input: InputConfig;
    public mode: 'release' | 'debug';

    constructor(json?: any) {
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
            this.input = new InputConfig(json['input']);
            this.mode = json['mode'];
        }
    }

    public combine(...args: HostConfig[]): HostConfig {
        if (args) {
            return args.reduce((prev, current) => {
                if (current) {
                    let combined = new HostConfig();
                    combined.spacing = prev.spacing !== undefined ? prev.spacing.combine(current.spacing) : current.spacing;
                    combined.separator = prev.separator !== undefined ? prev.separator.combine(current.separator) : current.separator;
                    combined.supportInteractive = current.supportInteractive !== undefined ?
                        current.supportInteractive : prev.supportInteractive;
                    combined.fontFamily = current.fontFamily !== undefined ? current.fontFamily : prev.fontFamily;
                    combined.fontSize = prev.fontSize !== undefined ? prev.fontSize.combine(current.fontSize) : current.fontSize;
                    combined.fontWeight = prev.fontWeight !== undefined ? prev.fontWeight.combine(current.fontWeight) : current.fontWeight;
                    combined.container = prev.container !== undefined ?
                        prev.container.combine(current.container) :
                        current.container;
                    combined.imageSize = prev.imageSize !== undefined ? prev.imageSize.combine(current.imageSize) : current.imageSize;
                    combined.action = prev.action !== undefined ? prev.action.combine(current.action) : current.action;
                    combined.card = prev.card !== undefined ? prev.card.combine(current.card) : current.card;
                    combined.imageSet = prev.imageSet !== undefined ? prev.imageSet.combine(current.imageSet) : current.imageSet;
                    combined.factSet = prev.factSet !== undefined ? prev.factSet.combine(current.factSet) : current.factSet;
                    combined.media = prev.media !== undefined ? prev.media.combine(current.media) : current.media;
                    combined.input = prev.input !== undefined ? prev.input.combine(current.input) : current.input;
                    combined.mode = current.mode !== undefined ? current.mode : prev.mode;
                    return combined;
                }
                return prev;
            }, this);
        }
        return this;
    }
}
