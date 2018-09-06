export class TreeNode {
    constructor(parent) {
        this.parent = parent;
    }
    get ancestors() {
        if (this.parent) {
            return [this.parent, ...this.parent.ancestors];
        }
        return [];
    }
    get ancestorsAndSelf() {
        return [this, ...this.ancestors];
    }
    get descends() {
        return this.children.reduce((prev, current) => {
            return prev.concat(current.descends);
        }, this.children.slice());
    }
    get descendsAndSelf() {
        return [this, ...this.descends];
    }
}
export var ActionType;
(function (ActionType) {
    ActionType["OpenUrl"] = "Action.OpenUrl";
    ActionType["Select"] = "Action.Select";
    ActionType["Submit"] = "Action.Submit";
    ActionType["ShowCard"] = "Action.ShowCard";
    ActionType["Callback"] = "Action.Callback";
})(ActionType || (ActionType = {}));
export var ContentType;
(function (ContentType) {
    ContentType["Column"] = "Column";
    ContentType["ColumnSet"] = "ColumnSet";
    ContentType["Container"] = "Container";
    ContentType["FactSet"] = "FactSet";
    ContentType["Image"] = "Image";
    ContentType["ImageSet"] = "ImageSet";
    ContentType["TextBlock"] = "TextBlock";
    ContentType["TextInput"] = "Input.Text";
    ContentType["NumberInput"] = "Input.Number";
    ContentType["DateInput"] = "Input.Date";
    ContentType["TimeInput"] = "Input.Time";
    ContentType["ToggleInput"] = "Input.Toggle";
    ContentType["ChoiceSetInput"] = "Input.ChoiceSet";
    ContentType["PeoplePicker"] = "Input.PeoplePicker";
    ContentType["AdaptiveCard"] = "AdaptiveCard";
})(ContentType || (ContentType = {}));
