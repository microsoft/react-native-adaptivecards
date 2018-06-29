import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement, ActionType } from '../Base/ActionElement';
import { CardElement } from '../Cards/Card';

export class ShowCardActionElement extends ActionElement {
    // Required
    public readonly card: CardElement;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.card = new CardElement(json.card, parent);
        }
    }

    public getTypeName(): string {
        return ActionType.ShowCard;
    }

    public getActionType(): ActionType {
        return ActionType.ShowCard;
    }

    public getAllInputFieldIds() {
        if (this.card) {
            let children = this.card.getChildren();
            return children.reduce(
                (prev, current) => {
                    return prev.concat(current.getAllInputFieldIds());
                },
                []
            );
        }
        return [];
    }

    public getRequiredProperties(): Array<string> {
        return ['card'];
    }
}
