import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FactElement } from './Fact';
export class FactSetElement extends ContentElement {
    constructor(json) {
        super(json);
        this.facts = [];
        if (this.isValidJSON) {
            this.facts = this.createFactSet(json.facts);
        }
    }
    getTypeName() {
        return ContentElementType.FactSet;
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
