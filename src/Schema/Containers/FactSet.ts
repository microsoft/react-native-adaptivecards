import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import Fact from './Fact';

export default class FactSet extends CardElement {
    // Required
    readonly facts: Array<Fact> = [];

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.facts = this.createFactSet(json.facts);
        }
    }

    getTypeName(): string {
        return CardElementType.FactSet;
    }
    getRequiredProperties(): Array<string> {
        return ['facts'];
    }

    private createFactSet(json: any): Array<Fact> {
        let factSet: Array<Fact> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let fact: Fact = new Fact(item);
                if (fact && fact.isValidJSON) {
                    factSet.push(fact);
                }
            });
        }
        return factSet;
    }

    hasFacts(): boolean {
        return this.facts && this.facts.length > 0;
    }
}
