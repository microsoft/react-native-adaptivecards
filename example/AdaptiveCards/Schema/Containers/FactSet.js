import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FactElement } from './Fact';
export class FactSetElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
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
    hasFacts() {
        return this.facts && this.facts.length > 0;
    }
    createFactSet(json) {
        let factSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let fact = new FactElement(item, this);
                if (fact && fact.isValidJSON) {
                    factSet.push(fact);
                }
            });
        }
        return factSet;
    }
}
