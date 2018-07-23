import { IElement } from './IElement';

export interface IContent extends IElement {
    readonly id?: string;
    readonly spacing?: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
    readonly separator?: boolean;
}
