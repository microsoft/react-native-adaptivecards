import { IElement } from '../../Schema/Interfaces/IElement';

export interface IElementViewProps<T extends IElement> {
    vIndex: number;
    hIndex: number;
    element: T;
    theme?: 'default' | 'emphasis';
}
