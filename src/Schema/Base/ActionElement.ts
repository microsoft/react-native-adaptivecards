import { CardElement } from '../Base/CardElement';

export enum ActionType {
    OpenUrl = 'Action.OpenUrl',
    Submit = 'Action.Submit',
    ShowCard = 'Action.ShowCard',
}

export abstract class ActionElement extends CardElement {
    // Optional
    readonly title?: string;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.title = json.title;
        }
    }

    public supportAction() {
        return true;
    }

    getAction(): ActionElement {
        return this;
    }

    getActions(): ActionElement[] {
        return [this.getAction()];
    }

    getData() {
        return {};
    }
}
