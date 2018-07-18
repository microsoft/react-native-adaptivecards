import { AbstractElement } from './AbstractElement';
import { FormElement } from './FormElement';

export enum ActionType {
    OpenUrl = 'Action.OpenUrl',
    Submit = 'Action.Submit',
    ShowCard = 'Action.ShowCard',
}

export abstract class ActionElement extends AbstractElement {
    public readonly title: string;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.title = json.title;
        }
    }

    public get action() {
        return this;
    }

    public abstract get scope(): FormElement;
}
