import { AdaptiveCardNode } from '../../Nodes/Cards/AdaptiveCard';
export class ShowCardParam {
    constructor(payload) {
        this.card = new AdaptiveCardNode(undefined, payload);
        this.card.show = false;
    }
}
