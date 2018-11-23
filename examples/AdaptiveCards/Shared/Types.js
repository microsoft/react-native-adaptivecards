export var ViewActionType;
(function (ViewActionType) {
    ViewActionType["OpenUrl"] = "Action.OpenUrl";
    ViewActionType["Submit"] = "Action.Submit";
    ViewActionType["ShowCard"] = "Action.ShowCard";
})(ViewActionType || (ViewActionType = {}));
export var PureActionType;
(function (PureActionType) {
    PureActionType["Select"] = "Action.Select";
    PureActionType["Callback"] = "Action.Callback";
})(PureActionType || (PureActionType = {}));
export var InputType;
(function (InputType) {
    InputType["TextInput"] = "Input.Text";
    InputType["NumberInput"] = "Input.Number";
    InputType["DateInput"] = "Input.Date";
    InputType["TimeInput"] = "Input.Time";
    InputType["ToggleInput"] = "Input.Toggle";
    InputType["ChoiceSet"] = "Input.ChoiceSet";
    InputType["Choice"] = "Input.Choice";
})(InputType || (InputType = {}));
export var ElementType;
(function (ElementType) {
    ElementType["TextBlock"] = "TextBlock";
    ElementType["Media"] = "Media";
    ElementType["Fact"] = "Fact";
})(ElementType || (ElementType = {}));
export var PlainContainerType;
(function (PlainContainerType) {
    PlainContainerType["FactSet"] = "FactSet";
    PlainContainerType["ImageSet"] = "ImageSet";
})(PlainContainerType || (PlainContainerType = {}));
export var SelectableContainerType;
(function (SelectableContainerType) {
    SelectableContainerType["Image"] = "Image";
    SelectableContainerType["Column"] = "Column";
    SelectableContainerType["ColumnSet"] = "ColumnSet";
    SelectableContainerType["Container"] = "Container";
    SelectableContainerType["AdaptiveCard"] = "AdaptiveCard";
})(SelectableContainerType || (SelectableContainerType = {}));
