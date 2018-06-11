import { CardElement } from '../Elements/CardElement';
import { CardElementType } from '../Elements/CardElementType';
import { FactElement } from './Fact';
export class FactSetElement extends CardElement {
    constructor(json) {
        super(json);
        this.facts = [];
        if (this.isValidJSON) {
            this.facts = this.createFactSet(json.facts);
        }
    }
    getTypeName() {
        return CardElementType.FactSet;
    }
    getRequiredProperties() {
        return ['facts'];
    }
    createFactSet(json) {
        let factSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let fact = new FactElement(item);
                if (fact && fact.isValidJSON) {
                    factSet.push(fact);
                }
            });
        }
        return factSet;
    }
    hasFacts() {
        return this.facts && this.facts.length > 0;
    }
}
