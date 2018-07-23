import { ActionType } from '../Schema/Abstract/ActionElement';
import { IElement } from '../Schema/Interfaces/IElement';

export interface ITreeNode<T> {
    parent: T;
    ancestors: T[];
    ancestorsAndSelf: T[];
    children: T[];
    descends: T[];
    descendsAndSelf: T[];
}

export interface ValidationResult {
    isValid: boolean;
    message: string;
}

export interface Dimension {
    width: number;
    height: number;
}

export interface ActionEventHandlerArgs<T extends IElement> {
    formData?: { [id: string]: string };
    formValidate: boolean;
    action: T;
    onFinishCallback: (data: any) => void;
    onErrorCallback: (data: any) => void;
}

export interface ActionHook {
    actionType: ActionType;
    func: (args: ActionEventHandlerArgs<IElement>) => ActionEventHandlerArgs<IElement>;
    name: string;
}
