import { AdaptiveCardElement } from '../AdaptiveCard';
import { ActionElement } from './Action';
import { ActionType } from './ActionType';

export class ShowCardActionElement extends ActionElement {
    // Required
    readonly card: AdaptiveCardElement;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.card = new AdaptiveCardElement(json.card);
        }
    }

    getTypeName(): string {
        return ActionType.ShowCard;
    }

    getRequiredProperties(): Array<string> {
        return ['card'];
    }

    getAction(): ActionElement {
        return this;
    }

    getActions(): ActionElement[] {
        return [this.getAction()];
    }
}
