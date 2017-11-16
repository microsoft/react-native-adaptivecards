import AdaptiveCard from '../AdaptiveCard';

import Action from './Action';
import ActionType from './ActionType';

export default class ActionShowCard extends Action {
    // Required
    readonly card: AdaptiveCard;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.card = new AdaptiveCard(json.card);
        }
    }

    getTypeName(): string {
        return ActionType.ShowCard;
    }
    getRequiredProperties(): Array<string> {
        return ['card'];
    }
}
