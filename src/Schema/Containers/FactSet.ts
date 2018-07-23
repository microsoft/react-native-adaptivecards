import { ContentElement } from '../Abstract/ContentElement';
import { IElement } from '../Interfaces/IElement';
import { FactElement } from './Fact';

export class FactSetElement extends ContentElement {
    // Required
    public readonly facts: Array<FactElement> = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.facts = [];
            if (json.facts) {
                json.facts.forEach((item: any) => {
                    let fact: FactElement = new FactElement(item, this);
                    if (fact && fact.isValid) {
                        this.facts.push(fact);
                    }
                });
            }
        }
    }

    public get children() {
        if (this.facts) {
            return this.facts;
        }
        return [];
    }

    public get requiredProperties() {
        return ['type', 'facts'];
    }
}
