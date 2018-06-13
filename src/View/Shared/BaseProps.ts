import { ActionElement } from '../../Schema/Base/ActionElement';
import { CardElement } from '../../Schema/Base/CardElement';

export interface ICardElementViewProps<T extends CardElement> {
    index?: number;
    element: T;
}

export interface IOptionalActionProps {
    action?: ActionElement;
    onActionTriggered?: (action: ActionElement) => void;
}
