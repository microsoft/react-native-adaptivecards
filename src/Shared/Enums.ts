/**
 * Shared
 */
export enum FlexDirection {
    Row = 'row',
    Column = 'column',
}

export enum HorizontalAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

/**
 * CardElements
 */
export enum Spacing {
    None = 'none',
    Small = 'small',
    Default = 'default',
    Medium = 'medium',
    Large = 'large',
    ExtraLarge = 'extraLarge',
    Padding = 'padding',
}

/**
 * TextBlock
 */
export enum FontSize {
    Small = 'small',
    Default = 'default',
    Medium = 'medium',
    Large = 'large',
    ExtraLarge = 'extraLarge',
}

export enum FontWeight {
    Lighter = 'lighter',
    Default = 'default',
    Bolder = 'bolder',
}

export enum TextColor {
    Default = 'default',
    Dark = 'dark',
    Light = 'light',
    Accent = 'accent',
    Good = 'good',
    Warning = 'warning',
    Attention = 'attention',
}

export enum FlexWrap {
    Wrap = 'wrap',
    NoWrap = 'nowrap',
}

export enum ImageSize {
    Auto = 'auto',
    Stretch = 'stretch',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum ImageStyle {
    Default = 'default',
    Person = 'person',
}

export enum FlexImageAlignment {
    FlexStart = 'flex-start',
    FlexEnd = 'flex-end',
    Center = 'center',
    Stretch = 'stretch',
}

export enum ColumnWidth {
    Auto = 'auto',
    Stretch = 'stretch',
}

export enum ContainerStyle {
    Default = 'default',
    Emphasis = 'emphasis',
}

export enum Size {
    Auto,
    Stretch,
    Small,
    Medium,
    Large,
}

export enum Padding {
    None,
    Default,
}

export enum VerticalAlignment {
    Top,
    Center,
    Bottom,
}

export enum ActionAlignment {
    Left,
    Center,
    Right,
    Stretch,
}

export enum ShowCardActionMode {
    Inline,
    Popup,
}

export enum Orientation {
    Horizontal,
    Vertical,
}

export enum BackgroundImageMode {
    Stretch,
    RepeatHorizontally,
    RepeatVertically,
    Repeat,
}

export enum ValidationError {
    Hint,
    ActionTypeNotAllowed,
    CollectionCantBeEmpty,
    Deprecated,
    ElementTypeNotAllowed,
    InteractivityNotAllowed,
    InvalidPropertyValue,
    MissingCardType,
    PropertyCantBeNull,
    TooManyActions,
    UnknownActionType,
    UnknownElementType,
    UnsupportedCardVersion,
}

export enum InputTextStyle {
    Text,
    Tel,
    Url,
    Email,
}

export enum ChoiceSetStyle {
    Compact,
    Expanded,
}
