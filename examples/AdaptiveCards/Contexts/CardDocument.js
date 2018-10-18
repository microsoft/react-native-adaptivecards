import { AdaptiveCardNode } from '../Models/Nodes/Cards/AdaptiveCard';
import { CardForm } from './CardForm';
export class CardDocument {
    constructor(payload) {
        this.model = new AdaptiveCardNode(undefined, payload);
        this.form = new CardForm(this);
    }
    findNode(predict) {
        if (this.model) {
            return this.model.descendsAndSelf.find(predict);
        }
        return undefined;
    }
    findNodeById(id) {
        if (this.model && id) {
            return this.findNode(current => current.id === id);
        }
        return undefined;
    }
}
