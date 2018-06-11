import { AdaptiveCardElement } from '../AdaptiveCard';
import { ActionElement } from './Action';
import { ActionType } from './ActionType';
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
    getAction() {
        return this;
    }
    getActions() {
        return [this.getAction()];
    }
}
