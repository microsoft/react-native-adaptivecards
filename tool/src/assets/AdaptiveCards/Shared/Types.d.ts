export interface ITreeNode<T> {
    parent: T;
    ancestors: T[];
    ancestorsAndSelf: T[];
    children: T[];
    descends: T[];
    descendsAndSelf: T[];
}
export declare abstract class TreeNode<T extends TreeNode<T>> implements ITreeNode<T> {
    parent: T;
    constructor(parent: T);
    readonly ancestors: T[];
    readonly ancestorsAndSelf: T[];
    abstract readonly children: T[];
    readonly descends: T[];
    readonly descendsAndSelf: T[];
}
export interface ValidationResult {
    isValid: boolean;
    message: string;
}
export interface Dimension {
    width: number;
    height: number;
}
export declare enum ActionType {
    OpenUrl = "Action.OpenUrl",
    Select = "Action.Select",
    Submit = "Action.Submit",
    ShowCard = "Action.ShowCard",
    Callback = "Action.Callback"
}
export declare enum ContentType {
    Column = "Column",
    ColumnSet = "ColumnSet",
    Container = "Container",
    Counter = "Microsoft.Counter",
    FactSet = "FactSet",
    Image = "Image",
    ImageSet = "ImageSet",
    TextBlock = "TextBlock",
    TextInput = "Input.Text",
    NumberInput = "Input.Number",
    DateInput = "Input.Date",
    TimeInput = "Input.Time",
    ToggleInput = "Input.Toggle",
    ChoiceSetInput = "Input.ChoiceSet",
    PeoplePicker = "Input.PeoplePicker",
    AdaptiveCard = "AdaptiveCard"
}
