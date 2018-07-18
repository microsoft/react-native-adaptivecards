import { ActionElement, ActionType } from '../Schema/Base/ActionElement';

export interface ValidationResult {
    isValid: boolean;
    message: string;
}

export interface Dimension {
    width: number;
    height: number;
}

export interface ActionEventHandlerArgs<T extends ActionElement> {
    formData?: { [id: string]: string };
    formValidate: boolean;
    action: T;
}

export interface ActionHook {
    actionType: ActionType;
    func: (args: ActionEventHandlerArgs<ActionElement>) => ActionEventHandlerArgs<ActionElement>;
    name: string;
}
