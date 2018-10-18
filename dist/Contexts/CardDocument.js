import { AdaptiveCardNode } from '../Models/Nodes/Cards/AdaptiveCard';
import { CardForm } from './CardForm';
export class CardDocument {
    constructor(json) {
        this.model = new AdaptiveCardNode(undefined, json);
        this.form = new CardForm();
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
