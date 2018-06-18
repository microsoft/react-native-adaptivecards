import { ActionElement, ActionType } from '../Base/ActionElement';
import { CardElement } from '../Cards/Card';
export class ShowCardActionElement extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.card = new CardElement(json.card, parent);
        }
    }
    getTypeName() {
        return ActionType.ShowCard;
    }
    getActionType() {
        return ActionType.ShowCard;
    }
    getAllInputFieldIds() {
        if (this.card) {
            let children = this.card.getChildren();
            return children.reduce((prev, current) => {
                return prev.concat(current.getAllInputFieldIds());
            }, []);
        }
        return [];
    }
    getRequiredProperties() {
        return ['card'];
    }
}
