import { AbstractElement } from '../../Schema/Base/AbstractElement';
import { ActionElement } from '../../Schema/Base/ActionElement';
import { ContentElement } from '../../Schema/Base/ContentElement';
import { FormElement } from '../../Schema/Base/FormElement';
import { InputElement } from '../../Schema/Base/InputElement';
import { ValueElement } from '../../Schema/Base/ValueElement';
import { CardElement } from '../../Schema/Cards/Card';

export interface IElementViewProps<T extends AbstractElement> {
    index: number;
    element: T;
}

export interface IActionElementViewProps<T extends ActionElement> {
    index: number;
    element: T;
}

export interface ICardElementViewProps<T extends CardElement> {
    index?: number;
    element: T;
}

export interface IContentElementViewProps<T extends ContentElement> {
    index: number;
    element: T;
}

export interface IFormElementViewProps<T extends FormElement> {
    index: number;
    element: T;
}

export interface IInputElementViewProps<T extends InputElement> {
    index: number;
    element: T;
}

export interface IValueElementViewProps<T extends ValueElement> {
    index: number;
    element: T;
}
