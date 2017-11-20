import AdaptiveCard from '../AdaptiveCard';
import Action from './Action';
import ActionType from './ActionType';
export default class ActionShowCard extends Action {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.card = new AdaptiveCard(json.card);
        }
    }
    getTypeName() {
        return ActionType.ShowCard;
    }
    getRequiredProperties() {
        return ['card'];
    }
}
