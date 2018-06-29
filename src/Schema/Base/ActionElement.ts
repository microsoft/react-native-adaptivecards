import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from './AbstractElement';

export enum ActionType {
    OpenUrl = 'Action.OpenUrl',
    Submit = 'Action.Submit',
    ShowCard = 'Action.ShowCard',
}

export abstract class ActionElement extends AbstractElement {
    // Optional
    public readonly title?: string;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.title = json.title;
        }
    }

    public hasAction() {
        return true;
    }

    public getAction(): ActionElement {
        return this;
    }

    public getActions(): ActionElement[] {
        return [this.getAction()];
    }

    public abstract getActionType(): ActionType;

    public getForm() {
        return this.getParent().getForm();
    }

    public getData() {
        return {};
    }

    public getStyleConfig(): ElementStyleConfig {
        return {};
    }

    public isAction() {
        return true;
    }
}
