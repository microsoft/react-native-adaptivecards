import { CardContext } from '../Contexts/CardContext';

export interface IContext<T> {
    model: T;
    registerModelUpdateHandler(handler: (model: T) => void): void;
    registerViewUpdateHandler(handler: () => void): void;
    updateModel(model: T): void;
    updateView(): void;
}

export interface ITreeNode {
    parent: ITreeNode;
    ancestors: ITreeNode[];
    ancestorsAndSelf: ITreeNode[];
    children: ITreeNode[];
    descends: ITreeNode[];
    descendsAndSelf: ITreeNode[];
    equals(node: ITreeNode): boolean;
    replaceChild(oldChild: ITreeNode, newChild: ITreeNode): void;
    removeChild(child: ITreeNode): void;
    insertChild(child: ITreeNode): void;
    insertSibling(sibling: ITreeNode, position: 'before' | 'after'): void;
    remove(): void;
    replace(newNode: ITreeNode): void;
}

export enum ViewActionType {
    OpenUrl = 'Action.OpenUrl',
    Submit = 'Action.Submit',
    ShowCard = 'Action.ShowCard',
}

export enum PureActionType {
    Select = 'Action.Select',
    Callback = 'Action.Callback',
}

export type ActionType = ViewActionType | PureActionType;

export enum InputType {
    TextInput = 'Input.Text',
    NumberInput = 'Input.Number',
    DateInput = 'Input.Date',
    TimeInput = 'Input.Time',
    ToggleInput = 'Input.Toggle',
    ChoiceSet = 'Input.ChoiceSet',
    Choice = 'Input.Choice',
}

export enum ElementType {
    TextBlock = 'TextBlock',
    Media = 'Media',
    Fact = 'Fact',
}

export enum PlainContainerType {
    FactSet = 'FactSet',
    ImageSet = 'ImageSet',
}

export enum SelectableContainerType {
    Image = 'Image',
    Column = 'Column',
    ColumnSet = 'ColumnSet',
    Container = 'Container',
    AdaptiveCard = 'AdaptiveCard',
}

export type BlockType = PlainContainerType | SelectableContainerType | ElementType | InputType;

export interface IMessage {
    level: 'info' | 'success' | 'warning' | 'error';
    message: string;
}

export interface IResult<T> {
    message: IMessage;
    data: T;
}

export interface Dimension {
    width: number;
    height: number;
}

export interface IChoice<T> {
    title: string;
    value: T;
    selected: boolean;
}

export interface IViewProps<T> {
    index: number;
    model: T;
    context: CardContext;
    theme: 'default' | 'emphasis';
}
