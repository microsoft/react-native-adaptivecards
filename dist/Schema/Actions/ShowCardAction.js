import { ActionElement, ActionType } from '../Base/ActionElement';
import { AdaptiveCardElement } from '../Cards/AdaptiveCard';
export class ShowCardActionElement extends ActionElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.card = new AdaptiveCardElement(json.card);
        }
    }
    getTypeName() {
        return ActionType.ShowCard;
    }
    getRequiredProperties() {
        return ['card'];
    }
}
