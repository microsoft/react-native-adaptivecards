import { ActionElement } from '../Base/ActionElement';
import { CardElement } from '../Cards/Card';
export class ShowCardActionElement extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.card = new CardElement(json.card, parent);
        }
    }
    get scope() {
        if (this.parent) {
            return this.parent;
        }
        return undefined;
    }
    get children() {
        if (this.card) {
            return [this.card];
        }
        return [];
    }
    getRequiredProperties() {
        return ['type', 'title', 'card'];
    }
}
