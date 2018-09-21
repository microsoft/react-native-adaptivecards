export interface ITreeNode<T> {
    parent: T;
    ancestors: T[];
    ancestorsAndSelf: T[];
    children: T[];
    descends: T[];
    descendsAndSelf: T[];
}

export abstract class TreeNode<T extends TreeNode<T>> implements ITreeNode<T> {
    public parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    public get ancestors(): T[] {
        if (this.parent) {
            return [this.parent, ...this.parent.ancestors];
        }
        return [];
    }

    public get ancestorsAndSelf(): T[] {
        return [this as any, ...this.ancestors];
    }

    public abstract get children(): T[];

    public get descends(): T[] {
        return this.children.reduce(
            (prev, current) => {
                return prev.concat(current.descends);
            },
            this.children.slice()
        );
    }

    public get descendsAndSelf(): T[] {
        return [this  as any, ...this.descends];
    }
}

export interface ValidationResult {
    isValid: boolean;
    message: string;
}

export interface Dimension {
    width: number;
    height: number;
}

export enum ActionType {
    OpenUrl = 'Action.OpenUrl',
    Select = 'Action.Select',
    Submit = 'Action.Submit',
    ShowCard = 'Action.ShowCard',
    Callback = 'Action.Callback',
}

export enum ContentType {
    Column = 'Column',
    ColumnSet = 'ColumnSet',
    Container = 'Container',
    Counter = 'Microsoft.Counter',
    FactSet = 'FactSet',
    Image = 'Image',
    ImageSet = 'ImageSet',
    TextBlock = 'TextBlock',
    TextInput = 'Input.Text',
    NumberInput = 'Input.Number',
    DateInput = 'Input.Date',
    TimeInput = 'Input.Time',
    ToggleInput = 'Input.Toggle',
    ChoiceSetInput = 'Input.ChoiceSet',
    PeoplePicker = 'Input.PeoplePicker',
    AdaptiveCard = 'AdaptiveCard',
}
