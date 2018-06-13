export var FlexDirection;
(function (FlexDirection) {
    FlexDirection["Row"] = "row";
    FlexDirection["Column"] = "column";
})(FlexDirection || (FlexDirection = {}));
export var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment["Left"] = "left";
    HorizontalAlignment["Center"] = "center";
    HorizontalAlignment["Right"] = "right";
})(HorizontalAlignment || (HorizontalAlignment = {}));
export var Spacing;
(function (Spacing) {
    Spacing["None"] = "none";
    Spacing["Small"] = "small";
    Spacing["Default"] = "default";
    Spacing["Medium"] = "medium";
    Spacing["Large"] = "large";
    Spacing["ExtraLarge"] = "extraLarge";
    Spacing["Padding"] = "padding";
})(Spacing || (Spacing = {}));
export var FontSize;
(function (FontSize) {
    FontSize["Small"] = "small";
    FontSize["Default"] = "default";
    FontSize["Medium"] = "medium";
    FontSize["Large"] = "large";
    FontSize["ExtraLarge"] = "extraLarge";
})(FontSize || (FontSize = {}));
export var FontWeight;
(function (FontWeight) {
    FontWeight["Lighter"] = "lighter";
    FontWeight["Default"] = "default";
    FontWeight["Bolder"] = "bolder";
})(FontWeight || (FontWeight = {}));
export var TextColor;
(function (TextColor) {
    TextColor["Default"] = "default";
    TextColor["Dark"] = "dark";
    TextColor["Light"] = "light";
    TextColor["Accent"] = "accent";
    TextColor["Good"] = "good";
    TextColor["Warning"] = "warning";
    TextColor["Attention"] = "attention";
})(TextColor || (TextColor = {}));
export var FlexWrap;
(function (FlexWrap) {
    FlexWrap["Wrap"] = "wrap";
    FlexWrap["NoWrap"] = "nowrap";
})(FlexWrap || (FlexWrap = {}));
export var ImageSize;
(function (ImageSize) {
    ImageSize["Auto"] = "auto";
    ImageSize["Stretch"] = "stretch";
    ImageSize["Small"] = "small";
    ImageSize["Medium"] = "medium";
    ImageSize["Large"] = "large";
})(ImageSize || (ImageSize = {}));
export var ImageStyle;
(function (ImageStyle) {
    ImageStyle["Default"] = "default";
    ImageStyle["Person"] = "person";
})(ImageStyle || (ImageStyle = {}));
export var FlexImageAlignment;
(function (FlexImageAlignment) {
    FlexImageAlignment["FlexStart"] = "flex-start";
    FlexImageAlignment["FlexEnd"] = "flex-end";
    FlexImageAlignment["Center"] = "center";
    FlexImageAlignment["Stretch"] = "stretch";
})(FlexImageAlignment || (FlexImageAlignment = {}));
export var ColumnWidth;
(function (ColumnWidth) {
    ColumnWidth["Auto"] = "auto";
    ColumnWidth["Stretch"] = "stretch";
})(ColumnWidth || (ColumnWidth = {}));
export var ContainerStyle;
(function (ContainerStyle) {
    ContainerStyle["Default"] = "default";
    ContainerStyle["Emphasis"] = "emphasis";
})(ContainerStyle || (ContainerStyle = {}));
export var Size;
(function (Size) {
    Size[Size["Auto"] = 0] = "Auto";
    Size[Size["Stretch"] = 1] = "Stretch";
    Size[Size["Small"] = 2] = "Small";
    Size[Size["Medium"] = 3] = "Medium";
    Size[Size["Large"] = 4] = "Large";
})(Size || (Size = {}));
export var Padding;
(function (Padding) {
    Padding[Padding["None"] = 0] = "None";
    Padding[Padding["Default"] = 1] = "Default";
})(Padding || (Padding = {}));
export var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
    VerticalAlignment[VerticalAlignment["Center"] = 1] = "Center";
    VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
})(VerticalAlignment || (VerticalAlignment = {}));
export var ActionAlignment;
(function (ActionAlignment) {
    ActionAlignment[ActionAlignment["Left"] = 0] = "Left";
    ActionAlignment[ActionAlignment["Center"] = 1] = "Center";
    ActionAlignment[ActionAlignment["Right"] = 2] = "Right";
    ActionAlignment[ActionAlignment["Stretch"] = 3] = "Stretch";
})(ActionAlignment || (ActionAlignment = {}));
export var ShowCardActionMode;
(function (ShowCardActionMode) {
    ShowCardActionMode[ShowCardActionMode["Inline"] = 0] = "Inline";
    ShowCardActionMode[ShowCardActionMode["Popup"] = 1] = "Popup";
})(ShowCardActionMode || (ShowCardActionMode = {}));
export var Orientation;
(function (Orientation) {
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(Orientation || (Orientation = {}));
export var BackgroundImageMode;
(function (BackgroundImageMode) {
    BackgroundImageMode[BackgroundImageMode["Stretch"] = 0] = "Stretch";
    BackgroundImageMode[BackgroundImageMode["RepeatHorizontally"] = 1] = "RepeatHorizontally";
    BackgroundImageMode[BackgroundImageMode["RepeatVertically"] = 2] = "RepeatVertically";
    BackgroundImageMode[BackgroundImageMode["Repeat"] = 3] = "Repeat";
})(BackgroundImageMode || (BackgroundImageMode = {}));
export var ValidationError;
(function (ValidationError) {
    ValidationError[ValidationError["Hint"] = 0] = "Hint";
    ValidationError[ValidationError["ActionTypeNotAllowed"] = 1] = "ActionTypeNotAllowed";
    ValidationError[ValidationError["CollectionCantBeEmpty"] = 2] = "CollectionCantBeEmpty";
    ValidationError[ValidationError["Deprecated"] = 3] = "Deprecated";
    ValidationError[ValidationError["ElementTypeNotAllowed"] = 4] = "ElementTypeNotAllowed";
    ValidationError[ValidationError["InteractivityNotAllowed"] = 5] = "InteractivityNotAllowed";
    ValidationError[ValidationError["InvalidPropertyValue"] = 6] = "InvalidPropertyValue";
    ValidationError[ValidationError["MissingCardType"] = 7] = "MissingCardType";
    ValidationError[ValidationError["PropertyCantBeNull"] = 8] = "PropertyCantBeNull";
    ValidationError[ValidationError["TooManyActions"] = 9] = "TooManyActions";
    ValidationError[ValidationError["UnknownActionType"] = 10] = "UnknownActionType";
    ValidationError[ValidationError["UnknownElementType"] = 11] = "UnknownElementType";
    ValidationError[ValidationError["UnsupportedCardVersion"] = 12] = "UnsupportedCardVersion";
})(ValidationError || (ValidationError = {}));
export var InputTextStyle;
(function (InputTextStyle) {
    InputTextStyle[InputTextStyle["Text"] = 0] = "Text";
    InputTextStyle[InputTextStyle["Tel"] = 1] = "Tel";
    InputTextStyle[InputTextStyle["Url"] = 2] = "Url";
    InputTextStyle[InputTextStyle["Email"] = 3] = "Email";
})(InputTextStyle || (InputTextStyle = {}));
export var ChoiceSetStyle;
(function (ChoiceSetStyle) {
    ChoiceSetStyle[ChoiceSetStyle["Compact"] = 0] = "Compact";
    ChoiceSetStyle[ChoiceSetStyle["Expanded"] = 1] = "Expanded";
})(ChoiceSetStyle || (ChoiceSetStyle = {}));
