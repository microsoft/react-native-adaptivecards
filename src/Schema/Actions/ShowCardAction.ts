import { ActionElement, ActionType } from '../Base/ActionElement';
import { AdaptiveCardElement } from '../Cards/AdaptiveCard';

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
}
