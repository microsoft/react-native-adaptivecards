export declare class SpacingConfig {
    default: number;
    small: number;
    medium: number;
    large: number;
    extralarge: number;
    padding: number;
    constructor(json?: any);
    combine(...args: SpacingConfig[]): SpacingConfig;
}
export declare class SeparatorConfig {
    thickness: number;
    color: string;
    spacing: number;
    constructor(json?: any);
    combine(...args: SeparatorConfig[]): SeparatorConfig;
}
export declare class FontSizeConfig {
    default: number;
    small: number;
    medium: number;
    large: number;
    extralarge: number;
    constructor(json?: any);
    combine(...args: FontSizeConfig[]): FontSizeConfig;
}
export declare class FontWeightConfig {
    default: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    lighter: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    bolder: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    constructor(json?: any);
    combine(...args: FontWeightConfig[]): FontWeightConfig;
}
export declare class ColorConfig {
    default: string;
    subtle: string;
    constructor(json?: any);
    combine(...args: ColorConfig[]): ColorConfig;
}
export declare class ColorSetConfig {
    default: ColorConfig;
    dark: ColorConfig;
    light: ColorConfig;
    accent: ColorConfig;
    attention: ColorConfig;
    good: ColorConfig;
    warning: ColorConfig;
    constructor(json?: any);
    combine(...args: ColorSetConfig[]): ColorSetConfig;
}
export declare class ThemeConfig {
    background: string;
    foreground: ColorSetConfig;
    constructor(json?: any);
    combine(...args: ThemeConfig[]): ThemeConfig;
}
export declare class ContainerConfig {
    default: ThemeConfig;
    emphasis: ThemeConfig;
    constructor(json?: any);
    combine(...args: ContainerConfig[]): ContainerConfig;
}
export declare class ImageSizeConfig {
    small: number;
    medium: number;
    large: number;
    constructor(json?: any);
    combine(...args: ImageSizeConfig[]): ImageSizeConfig;
}
export declare class ShowCardActionConfig {
    mode: 'Inline' | 'Popup' | 'InlineEdgeToEdge';
    margin: number;
    style: 'default' | 'emphasis';
    constructor(json?: any);
    combine(...args: ShowCardActionConfig[]): ShowCardActionConfig;
}
export declare class ActionConfig {
    capacity: number;
    actionSetSpacing: 'default' | 'small' | 'medium' | 'large' | 'extralarge' | 'padding';
    actionSpacing: number;
    showCard: ShowCardActionConfig;
    cardExpanding: boolean;
    direction: 'horizontal' | 'vertically';
    align: 'left' | 'right' | 'center' | 'stretch';
    iconPosition: 'LeftOfTitle' | 'AboveTitle';
    iconSize: number;
    constructor(json?: any);
    combine(...args: ActionConfig[]): ActionConfig;
}
export declare class CardConfig {
    allowCustomStyle: boolean;
    constructor(json?: any);
    combine(...args: CardConfig[]): CardConfig;
}
export declare class ImageSetConfig {
    imageSize: 'small' | 'medium' | 'large' | 'auto' | 'stretch';
    maxImageHeight: number;
    constructor(json?: any);
    combine(...args: ImageSetConfig[]): ImageSetConfig;
}
export declare class FactValueConfig {
    size: 'default' | 'small' | 'medium' | 'large' | 'extralarge';
    color: 'default' | 'accent' | 'attention' | 'good' | 'warning';
    isSubtle: boolean;
    weight: 'default' | 'lighter' | 'bolder';
    wrap: boolean;
    constructor(json?: any);
    combine(...args: FactValueConfig[]): FactValueConfig;
}
export declare class FactTitleConfig {
    size: 'default' | 'small' | 'medium' | 'large' | 'extralarge';
    color: 'default' | 'accent' | 'attention' | 'good' | 'warning';
    isSubtle: boolean;
    weight: 'default' | 'lighter' | 'bolder';
    wrap: boolean;
    maxWidth: number;
    constructor(json?: any);
    combine(...args: FactTitleConfig[]): FactTitleConfig;
}
export declare class FactSetConfig {
    title: FactTitleConfig;
    value: FactValueConfig;
    margin: number;
    constructor(json?: any);
    combine(...args: FactSetConfig[]): FactSetConfig;
}
export declare class InputThemeConfig {
    color: string;
    focusColor: string;
    backgroundColor: string;
    focusBackgroundColor: string;
    borderColor: string;
    focusBorderColor: string;
    constructor(json?: any);
    combine(...args: InputThemeConfig[]): InputThemeConfig;
}
export declare class InputConfig {
    default: InputThemeConfig;
    emphasis: InputThemeConfig;
    constructor(json?: any);
    combine(...args: InputConfig[]): InputConfig;
}
export declare class CheckboxColorConfig {
    checked: string;
    unchecked: string;
    constructor(json?: any);
    combine(...args: CheckboxColorConfig[]): CheckboxColorConfig;
}
export declare class CheckboxTitleConfig {
    color: string;
    constructor(json?: any);
    combine(...args: CheckboxTitleConfig[]): CheckboxTitleConfig;
}
export declare class CheckboxThemeConfig {
    title: CheckboxTitleConfig;
    box: CheckboxColorConfig;
    constructor(json?: any);
    combine(...args: CheckboxThemeConfig[]): CheckboxThemeConfig;
}
export declare class CheckboxConfig {
    default: CheckboxThemeConfig;
    emphasis: CheckboxThemeConfig;
    constructor(json?: any);
    combine(...args: CheckboxConfig[]): CheckboxConfig;
}
export declare class MediaConfig {
    defaultPosterUrl: string;
    playButtonUrl: string;
    constructor(json?: any);
    combine(...args: MediaConfig[]): MediaConfig;
}
export declare class HostConfig {
    spacing: SpacingConfig;
    separator: SeparatorConfig;
    supportInteractive: boolean;
    fontFamily: string;
    fontSize: FontSizeConfig;
    fontWeight: FontWeightConfig;
    container: ContainerConfig;
    imageSize: ImageSizeConfig;
    action: ActionConfig;
    card: CardConfig;
    imageSet: ImageSetConfig;
    factSet: FactSetConfig;
    media: MediaConfig;
    input: InputConfig;
    checkbox: CheckboxConfig;
    mode: 'release' | 'debug';
    constructor(json?: any);
    combine(...args: HostConfig[]): HostConfig;
}
