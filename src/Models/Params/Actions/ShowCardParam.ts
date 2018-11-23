import { AdaptiveCardNode } from '../../Nodes/Cards/AdaptiveCard';

export class ShowCardParam {
    public readonly card: AdaptiveCardNode;

    constructor(payload: any) {
        this.card = new AdaptiveCardNode(undefined, payload);
        this.card.show = false;
    }
}
