import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement } from '../Base/ContentElement';
import { FactElement } from './Fact';

export class FactSetElement extends ContentElement {
    // Required
    public readonly facts: Array<FactElement> = [];

    constructor(json: any, parent: AbstractElement) {
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

    public get children(): AbstractElement[] {
        if (this.facts) {
            return this.facts;
        }
        return [];
    }

    protected getRequiredProperties(): Array<string> {
        return ['type', 'facts'];
    }
}
