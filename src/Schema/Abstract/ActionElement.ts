import { IAction } from '../Interfaces/IAction';
import { IElement } from '../Interfaces/IElement';
import { IScope } from '../Interfaces/IScope';
import { AbstractElement } from './AbstractElement';

export enum ActionType {
    OpenUrl = 'Action.OpenUrl',
    Submit = 'Action.Submit',
    ShowCard = 'Action.ShowCard',
    Callback = 'Action.Callback',
}

export abstract class ActionElement extends AbstractElement implements IAction {
    public readonly title: string;

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.title = json.title;
        }
    }

    public get action() {
        return this;
    }

    public abstract get scope(): IScope;
}
