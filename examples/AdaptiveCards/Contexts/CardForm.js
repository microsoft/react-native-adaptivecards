import { InputNode } from '../Models/Nodes/Abstract/InputNode';
export class CardForm {
    constructor(card) {
        if (card) {
            this.model = card.model;
        }
    }
    get fields() {
        if (this.model) {
            return this.model.descendsAndSelf.filter(current => current && current instanceof InputNode);
        }
        return [];
    }
    isValid() {
        return this.fields.reduce((prev, current) => {
            if (prev && current) {
                prev = prev && current.isValid();
            }
            return prev;
        }, true);
    }
    get data() {
        return this.fields.reduce((prev, current) => {
            if (current.id) {
                prev[current.id] = current.stringify();
            }
            return prev;
        }, {});
    }
}
