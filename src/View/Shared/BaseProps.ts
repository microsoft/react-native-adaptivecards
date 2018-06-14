import { CardElement } from '../../Schema/Base/CardElement';

export interface ICardElementViewProps<T extends CardElement> {
    index?: number;
    element: T;
}
