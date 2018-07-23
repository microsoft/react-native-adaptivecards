import { IElement } from './IElement';
import { IScope } from './IScope';

export interface IAction extends IElement {
    readonly title: string;
    readonly action: IAction;
    readonly scope: IScope;
}
