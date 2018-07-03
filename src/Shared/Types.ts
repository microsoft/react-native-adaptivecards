import { AbstractElement } from '../Schema/Base/AbstractElement';
import { ActionElement, ActionType } from '../Schema/Base/ActionElement';

export interface Dimension {
    width: number;
    height: number;
}

export interface ActionEventHandlerArgs<T extends ActionElement> {
    formData?: { [id: string]: string };
    formValidate: boolean;
    action: T;
    target: AbstractElement;
}

export interface ActionHook {
    actionType: ActionType;
    func: (args: ActionEventHandlerArgs<ActionElement>) => ActionEventHandlerArgs<ActionElement>;
    name: string;
}
