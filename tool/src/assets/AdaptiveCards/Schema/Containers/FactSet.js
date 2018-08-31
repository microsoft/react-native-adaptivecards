import { ContentElement } from '../Abstract/ContentElement';
import { FactElement } from './Fact';
export class FactSetElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
        this.facts = [];
        if (this.isValid) {
            this.facts = [];
            if (json.facts) {
                json.facts.forEach((item) => {
                    let fact = new FactElement(item, this);
                    if (fact && fact.isValid) {
                        this.facts.push(fact);
                    }
                });
            }
        }
    }
    get children() {
        if (this.facts) {
            return this.facts;
        }
        return [];
    }
    get requiredProperties() {
        return ['type', 'facts'];
    }
}
