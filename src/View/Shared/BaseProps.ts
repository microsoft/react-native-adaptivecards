import { ActionElement } from '../../Schema/Actions/Action';

export interface ICardElementViewProps {
    index?: number;
}

export interface IFormProps {
    formId: string;
}

export interface IOptionalActionProps {
    action?: ActionElement;
    onActionTriggered?: (action: ActionElement) => void;
}

export interface IInputFieldProps {
    inputFieldId: string;
    containerId: string;
}
