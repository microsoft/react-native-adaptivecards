import { AbstractElement } from '../../Schema/Base/AbstractElement';

export interface IElementViewProps<T extends AbstractElement> {
    vIndex: number;
    hIndex: number;
    element: T;
    theme?: 'default' | 'emphasis';
}
