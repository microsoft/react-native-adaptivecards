import { ActionElement } from '../Abstract/ActionElement';
import { CardElement } from '../Cards/Card';
import { IElement } from '../Interfaces/IElement';
import { IScope } from '../Interfaces/IScope';

export class ShowCardActionElement extends ActionElement {
    // Required
    public readonly card: CardElement;

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.card = new CardElement(json.card, parent);
        }
    }

    public get scope(): IScope {
        if (this.parent) {
            return this.parent as IScope;
        }
        return undefined;
    }

    public get children() {
        if (this.card) {
            return [this.card];
        }
        return [];
    }

    public get requiredProperties() {
        return ['type', 'title', 'card'];
    }
}
