import { AdaptiveCardNode } from '../../Nodes/Cards/AdaptiveCard';

export class ShowCardParam {
    public readonly card: AdaptiveCardNode;

    constructor(json: any) {
        this.card = new AdaptiveCardNode(undefined, json);
        this.card.show = false;
    }
}
