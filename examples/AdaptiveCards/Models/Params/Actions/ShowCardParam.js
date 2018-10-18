import { AdaptiveCardNode } from '../../Nodes/Cards/AdaptiveCard';
export class ShowCardParam {
    constructor(json) {
        this.card = new AdaptiveCardNode(undefined, json);
        this.card.show = false;
    }
}
